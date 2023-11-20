import React from 'react';

function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 fixed bottom-0 w-full">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex items-center justify-center">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
