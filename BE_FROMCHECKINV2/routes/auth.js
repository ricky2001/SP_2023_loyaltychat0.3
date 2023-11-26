const express = require("express");
const router = express.Router();
// var app = express();

// var multer  = require("multer");

// var upload = multer();

const multer  = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const itemController = require('../controllers/item');

const {
  signup,
  signin,
  logout,
} = require("../controllers/auth");

const {
  verifyToken
} = require("./verify/verify");

const {
  consign,
  getUserPointConsign,
} = require("../controllers/consign");

const {
  names
} = require("../controllers/user");

const {
  getUserDateCheckIn,
  updatedCheckIn
} = require("../controllers/checkin");

const {
  getNews,
  createNews,
  updateNews,
  deleteNews
} = require("../controllers/newsfeed");

const {
  itemexchange,
  getUserItemExchange,
  createReward,
  updateReward,
  deleteReward
} = require("../controllers/item");

const {
  getaiMessage,
} = require("../controllers/openai")

const {
  scan
} = require("../controllers/scan");

const {
  getForm,
  createForm,
  updateForm,
  deleteForm,
  keepForm
} = require("../controllers/form");


router.post("/signup", signup);

router.post("/signin", signin);

router.post("/consign", verifyToken, consign);

router.get("/userConsign", verifyToken, getUserPointConsign);

router.post("/checkin", verifyToken, updatedCheckIn);

router.get("/userDateCheckIn", verifyToken, getUserDateCheckIn);

router.get("/user", verifyToken, names);

router.post("/itemexchange", verifyToken, itemexchange);

router.get("/getUserItemExchange", getUserItemExchange);

router.post("/createreward",upload.single('img'), verifyToken,createReward);

router.delete("/deletereward", verifyToken, itemController.deleteReward);

router.post("/updatereward", verifyToken,updateReward);

router.post("/aiMessage", getaiMessage);

router.get("/getNews", verifyToken, getNews)

router.post("/createNews", verifyToken, createNews)

router.post("/updateNews", verifyToken, updateNews)

router.delete("/deleteNews", verifyToken, deleteNews)

router.get("/getForm", verifyToken, getForm)

router.post("/createForm", verifyToken, createForm)

router.post("/updateForm", verifyToken, updateForm)

router.delete("/deleteForm", verifyToken, deleteForm)

router.post("/keepForm", verifyToken, keepForm)

// router.get("/UserRewardExchange", verifyToken, getUserRewardExchange);

router.post("/scanqrcode", verifyToken, scan);

// router.post("/logout", verifyToken ,logout);

module.exports = router;
