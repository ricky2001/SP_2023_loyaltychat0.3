<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#prerequisites">Prerequisites</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#deploy">Deploy</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Loyalty is important with a company to make employees comfortable and happy while doing work and the interaction among employees is important too. So with the hybrid mode that employees work their job sometime in home or company, that may make the problem about loyalty with  employees less interaction among employees.With the benefit that employees in the company are rewarded for their more interactions, they are more loyalty and may be able to focus their job better and challenging the employee with a check in work so the employee can check in and get reward by collect check in stack.


### Built With

This project used framework Reactjs + Vite and used Nodejs with Express.js.

* [![Node][Node.js]][Node-url]
* [![React][React.js]][React-url]
* [![Vite][Vite]][Vite-url]
* [![Express.js][Express.js]][Express-url]
* [![Tailwind CSS][Tailwind]][Tailwind-url]
* [![OpenAI][OpenAI]][OpenAI-url]
* [![Resend](https://img.shields.io/badge/Resend-white?style=for-the-badge&logo=data:image/png;base64,iVBORw0KG...)](https://resend.com/)
* [![Firebase][Firebase]][Firebase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

How you can instruct our audience on installing and setting up our app.

1. First, in git repository press code button and select HTTPS and coppy link
2. Clone the repo by type this command in terminal
   
   ```sh
   git clone https://github.com/ricky2001/loyaltychat0.3.git
   ```
   
After you clone this project open terminal, you have to go in two folders.
this cd into frontend folder
  ```sh
  cd FE_FRONTENDV2
  ```
after you go in frontend folder you have to open new cmd for go in to backend folder and this cd into backend folder
  ```sh
  cd BE_FROMCHECKINV2
  ```


### Prerequisites

After you go into root folders of backend and frontend, you have to type npm command for install package.
* npm
  ```sh
  npm i
  or
  npm install
  ```




<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

After you install in each folders finished, you have to run this command for running our project.
* npm run dev
  ```sh
  npm run dev
  ```
You can use this command(npm run dev) in both frontend and backend. If you want to see the database, you can see on firebase.

[![Firebase][Firebase]][Firebase-url] (click this to go see our firebase)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Deploy
If you want to deploy this project, you have to do by step:

First you have to open Visual Studio Code, then open project folder.

For frontend

1. Open folder `FE_FRONTENDV2`, then go into `src\utils\api`

2. You will see `axiosIntance.js` file, then open it.

3. You will see code in line 6 and 7,
  ```sh
  const baseURL = 'http://localhost:3000/';
//  const baseURL = 'https://us-central1-loyalty-e5fdd.cloudfunctions.net/api';
  ```
Change to be this.
```sh
//  const baseURL = 'http://localhost:3000/';
  const baseURL = 'https://us-central1-loyalty-e5fdd.cloudfunctions.net/api';
  ```

4. Open terminal and go into frontend folder.
  ```sh
  cd FE_FRONTENDV2
  ```

5. After that run this command for deploy frontend.
  ```sh
  firebase deploy
  ```
  Then wait until it finish.

For backend

1. Open folder `BE_FROMCHECKINV2`, You will see `app.js` file, then open it.

2. You will see code in app.js,
  ```sh
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

// Routes
const authRoutes = require("./routes/auth");

app.use(bodyParser.json({ extended: false,limit:'10mb' }));
app.use(cors()); 

// Routes
app.use("/api", authRoutes);

// PORT
const port = 3000;

// Starting a server
app.listen(port, () => {
  console.log(Start server : ${port});
});

//for deploy
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const app = express();
// const functions = require('firebase-functions');
// const authRoutes = require("./routes/auth");

// app.use(bodyParser.json({ extended: false ,limit:'10mb'}));
// app.use(cors()); 

// // Routes
// app.use("/api", authRoutes);

// exports.api = functions.https.onRequest(app);
  ```
Change to be this.
```sh
// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require('cors');
// const app = express();

// Routes
// const authRoutes = require("./routes/auth");

// app.use(bodyParser.json({ extended: false,limit:'10mb' }));
// app.use(cors()); 

// Routes
// app.use("/api", authRoutes);

// PORT
// const port = 3000;

// Starting a server
// app.listen(port, () => {
//   console.log(Start server : ${port});
// });


// for deploy
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const functions = require('firebase-functions');
const authRoutes = require("./routes/auth");

app.use(bodyParser.json({ extended: false ,limit:'10mb'}));
app.use(cors()); 

// Routes
app.use("/api", authRoutes);

exports.api = functions.https.onRequest(app);
  ```

4. Open terminal and go into frontend folder.
  ```sh
  cd BE_FROMCHECKINV2
  ```

5. After that run this command for deploy frontend.
  ```sh
  firebase deploy
  ```
  Then wait until it finish, After you done every steps it is mean you deploy successful.


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

MFU

IT school, SE major(Gen 16) 

ID:6331305002 Mr. JIRAWAT RATSAMEE

ID:6331305007 Mr. CHINDANAI POTIJUNTAJINDA

ID:6331305014 Mr. NUNTAWAT PRANGSANGWILAI

ID:6331305023 Mrs. RISA SIRIROT

ID:6331305037 Mr. PHEERAPHOL MEKKHARACH

ID:6331305048 Mr. Sai Reacky


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Email Adress - 6331305007@lamduan.mfu.ac.th - 6331305023@lamduan.mfu.ac.th

Project Link: [https://github.com/ricky2001/loyaltychat0.3.git](https://github.com/ricky2001/loyaltychat0.3.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Node.js]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vite]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vitejs.dev/
[Express.js]: https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[OpenAI]: https://img.shields.io/badge/OpenAI-0082C8?style=for-the-badge&logo=openai&logoColor=white
[OpenAI-url]: https://openai.com/
[Firebase]: https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black
[Firebase-url]: https://console.firebase.google.com/u/1/project/loyalty-e5fdd/overview
