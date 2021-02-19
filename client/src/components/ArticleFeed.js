import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { addUserArticle, getUser, getUserArticles, removeUserArticle } from '../utils/apiEndpoints';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from '../themes/theme';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { userLogin } from '../actions';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

const ArticleFeed = () => {
  const dispatch = useDispatch();
  const [articles, setArticles] = useState(null);
  const [articlesForPage, setArticlesForPage] = useState(null);
  const [page, setPage] = useState(1);
  const [userArticleIds, setUserArticleIds] = useState(null);
  const userArticleSelector = useSelector(state => state.user.articles);
  const classes = useStyles();

  useEffect(() => {
    Axios.get('/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));  
  }, []);

  useEffect(() => {
    if(articles) setArticlesForPage(articles.slice(0, 10));
    setUserArticleIds(getUserArticleIds());
  }, [articles]);

  const getUserArticleIds = () => {
    return userArticleSelector ? 
      userArticleSelector : 
      [];
  };

  const decrementPage = () => {
    if(page === 1) return;
    const newPage = page-1;
    setArticlesForPage(articles.slice((newPage-1)*10, ((newPage-1)*10)+10));
    setPage(page-1);
  }

  const incrementPage = () => {
    if(page === 9) return;
    setArticlesForPage(articles.slice(page*10, (page*10)+10));
    setPage(page+1);
  }

  const addArticle = async (articleId) => {
    await addUserArticle(articleId);
    const user = (await getUser()).data.user;
    const articles = (await getUserArticles()).data;

    dispatch(userLogin(user, articles));  
  };

  const removeArticle = async (articleId) => {
    await removeUserArticle(articleId);
    const user = (await getUser()).data.user;
    const articles = (await getUserArticles()).data;

    dispatch(userLogin(user, articles));  
  };

  useEffect(() => {
    setUserArticleIds(userArticleSelector);
  }, [addArticle, removeArticle]);

  return (
    <div>
      {articlesForPage ?
      <div> 
        <TableContainer>
          <Table className={classes.articleTable} aria-label='simple table'>
            <TableHead className={classes.interviewTableHeader}>
              <TableRow>
                <TableCell className={classes.headerFont} align='left'>
                  <Typography variant="h4">Article</Typography>
                </TableCell>
                <TableCell className={classes.headerFont} align='left'>
                  <Typography variant="h4">Source</Typography>
                </TableCell>
                <TableCell className={classes.headerFont} align='left'>
                  <Typography variant="h4">Published</Typography>
                </TableCell>
                <TableCell className={classes.headerFont} align='center'>
                  <Typography variant="h4">Add to list?</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articlesForPage.map((article, i) => {
                const articleNameArr = article.title.split(' - ');
                return (
                  <TableRow key={article._id}>
                    <TableCell component='th' scope='row'>
                      <a href={article.url} target="_blank" rel="noreferrer">{articleNameArr[0]}</a>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <Typography>{articleNameArr[1]}</Typography>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      <Typography>{article.published.slice(0,16)}</Typography>
                    </TableCell>
                    <TableCell component='th' scope='row' align='center'>
                      {!userArticleIds.includes(article._id) ?
                        <AddIcon className={classes.addArticleIcon} onClick={() => addArticle(article._id)} /> :
                        <RemoveIcon className={classes.removeArticleIcon} text="Remove" onClick={() => removeArticle(article._id)} />}
                    </TableCell>
                </TableRow>
                )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{display: 'flex', flexDirection: 'row', height: '20px', alignContent: 'center', textAlign: 'center', justifyContent: 'center', marginTop:'10px'}}>
            <button 
              onClick={() => decrementPage()}
              style={{marginRight: '10px'}}
            >
              Prev.
            </button>
            {page}
            <button 
              onClick={() => incrementPage()}
              style={{marginLeft: '10px'}}
            >
              Next.
            </button>
          </div>
      </div> :
        <div>
          Loading....
        </div>
      }
    </div>
      
  )
};

export default ArticleFeed;