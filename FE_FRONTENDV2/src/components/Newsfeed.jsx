import React, { useEffect, useState } from 'react';
import PopupCreate from './PopupCreate';

function Newsfeed() {
  const [usernewsfeed, setUsernewsfeed] = useState([]);
  const [isPopUpVisible, setPopUpVisible] = useState(false);

  useEffect(() => {
    fetch('/api/newsfeed')
      .then((response) => response.json())
      .then((data) => {
        setUsernewsfeed(data.newsfeedItems);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePlusClick = () => {
    setPopUpVisible(true);
  };

  const handleClosePopUp = () => {
    setPopUpVisible(false);
  };

  const handleTextSubmit = (text) => {
    // Handle the submitted text here (e.g., save it, process it, etc.).
    console.log(`Submitted text: ${text}`);
  };

  return (
    <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 mx-4 lg:mx-12 w-full">
      <div className="max-w-2xl mx-auto px-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4 p-5">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Recent</h5>
          <div className="ml-2"></div>
          <i className="bi bi-plus-circle-fill text-gray-700 font-bold text-xl"
            onClick={handlePlusClick}
          ></i>
        </div>

        <div >
          {isPopUpVisible && (
            <PopupCreate onClose={handleClosePopUp} onSubmit={handleTextSubmit} />
          )}
          <h1>Newsfeed</h1>
          <ul>
            {usernewsfeed.map((item) => (
              <li key={item.id}>{item.content}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>

  );
}

export default Newsfeed;
