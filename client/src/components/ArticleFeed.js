import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { addUserArticle, getUser, getUserArticles } from '../utils/apiEndpoints';
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
import { CustomButton } from './Buttons'
import { userLogin } from '../actions'

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
    if(articles) setArticlesForPage(articles.slice(page-1, page*10));
    setUserArticleIds(getUserArticleIds());
  }, [articles, page]);

  const getUserArticleIds = () => {
    return userArticleSelector ? 
      userArticleSelector : 
      [];
  };

  const decrementPage = () => {
    if(page === 1) return;
    const newPage = page-1;
    setArticlesForPage(articles.slice(newPage*10, (newPage*10)+10));
    setPage(page-1);
  }

  const incrementPage = () => {
    if(page === 9) return;
    const newPage = page+1;
    setArticlesForPage(articles.slice(newPage*10, (newPage*10)+10));
    setPage(page+1);
  }

  const addArticle = async (articleId) => {
    await addUserArticle(articleId);
    const user = (await getUser()).data.user;
    const articles = (await getUserArticles()).data;

    dispatch(userLogin(user, articles));  
  };

  useEffect(() => {
    setUserArticleIds(userArticleSelector);
  }, [addArticle]);
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3">Articles</Typography>
      </div>
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
                    <TableCell component='th' scope='row'>
                      {!userArticleIds.includes(article._id) ?
                        <CustomButton classField={classes.addRemoveButton} text="Add" onClick={() => addArticle(article._id)}></CustomButton> :
                        <CustomButton classField={classes.addRemoveButton} text="Remove"></CustomButton>}
                      
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