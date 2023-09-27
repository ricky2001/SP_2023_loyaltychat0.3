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
  getUserPointConsign
} = require("../controllers/consign");

const {
  getUserDateCheckIn,
  updatedCheckIn
} = require("../controllers/checkin");

const {
  getNewsfeed
} = require("../controllers/newsfeed");

router.post("/signup", signup);

router.post("/signin", signin);

router.post("/consign", verifyToken ,consign);

router.get("/userConsign",verifyToken, getUserPointConsign);

router.post("/checkin", verifyToken ,updatedCheckIn);

router.get("/userDateCheckIn", verifyToken ,getUserDateCheckIn);

router.get("/news", getNewsfeed)

// router.post("/logout", verifyToken ,logout);

module.exports = router;
