const createError = require("http-errors");
const express = require("express");
const cors = require('cors');
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const passport = require('passport');
const Discord = require('discord.js');
const client = new Discord.Client();
const { loginUser } = require('./models/User');
const { getArticlesForDiscord } = require('./models/Article');
require('dotenv').config();
const { DISCORD_API_TOKEN } = process.env;

let authenticated = false;
let articles;

// Connect to MongoDB
connectDB();

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const articleRouter = require("./routes/articles");
const userRouter = require("./routes/users");

const { json, urlencoded } = express;

const app = express();

require('./config/passport')(passport);

app.use(cors());

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/articles", articleRouter);
app.use("/users", userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});


client.once('ready', () => {
	console.log('Discord bot connected!');
});

client.on('message', async (message) => {
	if (message.content.startsWith('!login')) {
    const stringArr = message.content.split('-');

    if(!stringArr.length === 3) {
      message.channel.send("Invalid Input");
      return;
    }
    
    const loginCredentials = {
      email: stringArr[1],
      password: stringArr[2]
    };

    const user = (await loginUser({ body: loginCredentials }));
    if(user.error) {
      message.channel.send("Error: Invalid credentials. Please try again");
      return;
    }
    const userArticles = user.user.articles;

    const articles = await getArticlesForDiscord(userArticles);
    const discordArticleFields = [];

    if(articles.length > 0) {
      for(const article of articles) {
        discordArticleFields.push({
          name: article.title,
          value: `[Click here to read](${article.url})`
        });
      }
    } else {
      discordArticleFields.push({
        name: 'Sorry',
        value: 'You currently have no articles'
      })
    }

    const articleEmbed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Pokord News - Your most up to date poker news')
      .setURL('https://discord.js.org/')
      .setAuthor('By Kevin Yi', 'https://i.imgur.com/WXgOKVe.png')
      .setDescription(`You have ${articles.length} ${articles.length === 1 ? 'article' : 'articles'}`)
      .setThumbnail('https://i.imgur.com/WXgOKVe.png')
      .addFields(
         ...discordArticleFields
      )
      .setTimestamp()
      .setFooter('To add more articles please visit http://localhost:3000');
    message.channel.send(articleEmbed);
  }
});

client.login(DISCORD_API_TOKEN);

module.exports = app;
