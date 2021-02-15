import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const ArticleFeed = () => {
  const [articles, setArticles] = useState(null);
  const [articlesForPage, setArticlesForPage] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Axios.get('/articles')
      .then(res => setArticles(res.data))
      .catch(err => console.error(err));  
  }, []);

  useEffect(() => {
    if(articles) setArticlesForPage(articles.slice(page-1, page*10)); 
  }, [articles, page]);

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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Articles</h1>
      </div>
      {articlesForPage ? 
        <div style ={{ marginLeft: '50px' }}>
          {articlesForPage.map(article => {
            return (
              <div key={article._id}>
                <a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
                <p>{`Published: ${article.published}`}</p>
              </div>
            )
          })}
          <div style={{display: 'flex', flexDirection: 'row', height: '20px', alignContent: 'center', textAlign: 'center'}}>
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