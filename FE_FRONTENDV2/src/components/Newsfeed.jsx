import React, { useEffect, useState } from 'react';
import './Newsfeed/newsfeed.css';

import axiosInstance from '../utils/api/axiosIntance.js';

function Newsfeed() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [updateAuthor, setUpdateAuthor] = useState('');
  const [updateDetail, setUpdateDetail] = useState('');
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const postNews = async () => {
    const response = await axiosInstance.post('/api/createNews', {
      content: newDetail,
      author: newAuthor,
      timestamp: new Date().getTime(), // Example timestamp creation, adjust according to Firestore timestamp
    });
    const newNewsId = response.data.newsId;
    setNewsList([{ id: newNewsId, author: newAuthor, detail: newDetail }, ...newsList]);
    setPopupOpen(false);
    setNewAuthor('');
    setNewDetail('');
  };

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    const response = await axiosInstance.get('/api/getNews');
    const sortedNews = response.data.newsfeedItems.sort((a, b) => b.timestamp - a.timestamp);
    setNewsList(sortedNews);
  };

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setNewAuthor('');
    setNewDetail('');
  };

  const openEdit = (id) => {
    setSelectedNewsId(id);
    setEditOpen(true);
    const selectedNews = newsList.find(news => news.id === id);
    setUpdateAuthor(selectedNews.author);
    setUpdateDetail(selectedNews.detail);
  };

  const closeEdit = () => {
    setEditOpen(false);
    setUpdateAuthor('');
    setUpdateDetail('');
    setSelectedNewsId(null);
  };

  const performEdit = async () => {
    if (updateAuthor && updateDetail) {
      const updatedNewsList = [...newsList];
      const newsIndex = updatedNewsList.findIndex(news => news.id === selectedNewsId);
      updatedNewsList[newsIndex] = { id: selectedNewsId, author: updateAuthor, detail: updateDetail };
      setNewsList(updatedNewsList);
      try {
        await axiosInstance.post(`api/updateNews?id=${selectedNewsId}`, {
          author: updateAuthor,
          detail: updateDetail,
        });
      } catch (error) {
        console.error("Failed to update news:", error);
      }
      closeEdit();
    }
  };

  const performDelete = async (id) => {
    const updatedNewsList = newsList.filter(news => news.id !== id);
    setNewsList(updatedNewsList);
    try {
      await axiosInstance.delete(`api/deleteNews?id=${id}`);
    } catch (error) {
      console.error("Failed to delete news:", error);
    }
    closeEdit();
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(newsList.length / cardsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = newsList.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 mx-4 lg:mx-12 w-full ">
      <div className="max-w-2xl mx-auto px-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4 p-5">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Recent</h5>
          <div className="ml-2"></div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={openPopup}>
            Create News
          </button>
        </div>

        <div className="news-list">
          {currentCards.map((news, index) => (
            <div key={news.id} className="card">
              <h3>Author: {news.author}</h3>
              <p>Detail: {news.detail}</p>
              <div>
                <button onClick={() => openEdit(news.id)}>Edit/Delete</button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination">
          {newsList.length > cardsPerPage && (
            <div className="page-numbers">
              <button onClick={prevPage}>Previous</button>
              {Array.from({ length: Math.ceil(newsList.length / cardsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? 'active' : ''}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={nextPage}>Next</button>
            </div>
          )}
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <h2>Create News</h2>
          <input
            type="text"
            placeholder="Author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <textarea
            placeholder="News Detail"
            value={newDetail}
            onChange={(e) => setNewDetail(e.target.value)}
          />
          <div className="button-container">
            <button className="bg-blue-500 text-white" onClick={postNews}>
              Save News
            </button>
            <button className="bg-red-500 text-white" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {isEditOpen && (
        <div className="popup">
          <h2>Edit/Delete News</h2>
          <input
            type="text"
            placeholder="Author"
            value={updateAuthor}
            onChange={(e) => setUpdateAuthor(e.target.value)}
          />
          <textarea
            placeholder="News Detail"
            value={updateDetail}
            onChange={(e) => setUpdateDetail(e.target.value)}
          />
          <div className="button-container">
            <button className="bg-blue-500 text-white" onClick={performEdit}>
              Update News
            </button>
            <button className="bg-red-500 text-white" onClick={() => performDelete(selectedNewsId)}>
              Delete News
            </button>
            <button className="bg-gray-500 text-white" onClick={closeEdit}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Newsfeed;
