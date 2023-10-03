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
const{
  names
}=require("../controllers/user");

const {
  getUserDateCheckIn,
  updatedCheckIn
} = require("../controllers/checkin");

const {

  getNewsfeed
} = require("../controllers/newsfeed");

const {
  item,
  getUserRewardExchange
} = require("../controllers/item");


router.post("/signup", signup);

router.post("/signin", signin);

router.post("/consign", verifyToken ,consign);

router.get("/userConsign",verifyToken, getUserPointConsign);

router.post("/checkin", verifyToken ,updatedCheckIn);

router.get("/userDateCheckIn", verifyToken ,getUserDateCheckIn);


router.get("/news", getNewsfeed)

router.get("/user",verifyToken, names);

router.post("/item", verifyToken ,item);

router.get("/UserRewardExchange", verifyToken ,getUserRewardExchange);


// router.post("/logout", verifyToken ,logout);

module.exports = router;
