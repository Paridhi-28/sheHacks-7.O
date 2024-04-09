const router = require("express").Router();
const dataManagement = require("../middleware/dataManagement");

router.get("/getTweets", dataManagement.getTweets);

router.get("/TPC", dataManagement.getTPCData);

router.get("/TPCPerY", dataManagement.getCrimesPerY);

router.get("/TPCPerYearByCategory", dataManagement.getCrimesPerYearByCategory);

module.exports = router;
