const express = require("express");
const router = express.Router();

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
  getUserItemExchange
} = require("../controllers/item");

const {
  openai,
} = require("../controllers/openai")

const {
  scan
} = require("../controllers/scan");


router.post("/signup", signup);

router.post("/signin", signin);

router.post("/consign", verifyToken, consign);

router.get("/userConsign", verifyToken, getUserPointConsign);

router.post("/checkin", verifyToken, updatedCheckIn);

router.get("/userDateCheckIn", verifyToken, getUserDateCheckIn);

router.get("/user", verifyToken, names);

router.post("/itemexchange", verifyToken, itemexchange);

router.get("/getUserItemExchange", getUserItemExchange);


router.post("/aiMessage", getaiMessage);

router.get("/getNews", verifyToken, getNews)

router.post("/createNews", verifyToken, createNews)

router.post("/updateNews", verifyToken, updateNews)

router.delete("/deleteNews", verifyToken, deleteNews)


// router.get("/UserRewardExchange", verifyToken, getUserRewardExchange);

router.post("/scanqrcode", verifyToken, scan);

// router.post("/logout", verifyToken ,logout);

module.exports = router;
