const mongoose = require("mongoose");

const tweetSchema = new mongoose.Schema({
  Status: {
    type: String,
    required: true,
  },
  Updates: {
    type: String,
    required: true,
  },
  Location: {
    type: [String, Array],
    required: true,
  },
  LocationGoeCode: {
    type: Array
    
  },
  TweetedTime: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
  },
  Description: {
    type: Array,
  },
});

module.exports = mongoose.connection.useDb('Toronto_Police_Crime_Report').model("tweetsData", tweetSchema, 'tweetsData');
