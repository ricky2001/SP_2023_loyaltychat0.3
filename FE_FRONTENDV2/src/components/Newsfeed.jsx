import React, { useEffect, useState } from 'react';
import './Newsfeed/newsfeed.css';

function Newsfeed() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newDetail, setNewDetail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setNewAuthor('');
    setNewDetail('');
  };

  const createNews = () => {
    if (newAuthor && newDetail) {
      setNewsList([...newsList, { author: newAuthor, detail: newDetail }]);
      closePopup();
    }
  };

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
            <div key={index} className="card">
              <h3>Author: {news.author}</h3>
              <p>Detail: {news.detail}</p>
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
            <button className="bg-blue-500 text-white" onClick={createNews}>
              Save News
            </button>
            <button className="bg-red-500 text-white" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}

    </section>

  );
}

export default Newsfeed;
