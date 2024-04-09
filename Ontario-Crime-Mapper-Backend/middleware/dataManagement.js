const tweets = require("../model/Tweets");
const TPC = require("../model/TPC_Data");

const getTweets = async (req, res) => {
  try {
    const tweetsData = await tweets.find({});
    // console.log(tweetsData)
    res.status(200).send(tweetsData);
  } catch (error) {
    console.log(`error ${error}`);
  }
};

const getTPCData = async (req, res) => {
  try {
    const TPCData = await TPC.find({ REPORT_YEAR: 2014 });
    // console.log(TPCData);
    res.status(200).send(TPCData);
  } catch (error) {
    console.log(`Error with TPCData`);
    res.sendStatus(500);
  }
};

const getCrimesPerY = async (req, res) => {
  try {
    const pipeline = [
      {
        $project: {
          _id: 0,
          year: "$REPORT_YEAR",
        },
      },
      {
        $group: {
          _id: "$year",
          crimeCount: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];

    const result = await TPC.aggregate(pipeline).exec();

    // // Print the result
    // result.forEach((entry) => {
    //   console.log(`Year: ${entry._id}, Crime Count: ${entry.crimeCount}`);
    // });

    res.status(200).send(result);
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const getCrimesPerYearByCategory = async (req, res) => {
  try {
    const pipeline = [
      {
        $project: {
          _id: 0,
          year: "$REPORT_YEAR",
          crimeCategory: "$MCI_CATEGORY",
        },
      },
      {
        $group: {
          _id: {
            year: "$year",
            crimeCategory: "$crimeCategory",
          },
          crimeCount: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.crimeCategory": 1 },
      },
      {
        $group: {
          _id: "$_id.year",
          crimeData: {
            $push: {
              crimeCategory: "$_id.crimeCategory",
              crimeCount: "$crimeCount",
            },
          },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    const result = await TPC.aggregate(pipeline).exec();
    res.status(200).send(result)
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  getTweets,
  getTPCData,
  getCrimesPerY,
  getCrimesPerYearByCategory,
};
