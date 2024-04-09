const mongoose = require("mongoose");

const TPCSchema = new mongoose.Schema({
  DIVISION: {
    type: String,
    required: true,
  },
  EVENT_UNIQUE_ID: {
    type: String,
    required: true,
  },
  LAT_WGS84: {
    type: Number,
    required: true,
  },
  LOCATION_TYPE: {
    type: Array
    
  },
  LONG_WGS84: {
    type: Number,
    required: true,
  },
  MCI_CATEGORY: {
    type: String,
    required: true,
  },
  NEIGHBOURHOOD_140: {
    type: String,
    required: true,
  },
  NEIGHBOURHOOD_158: {
    type: String,
    required: true,
  },
  OBJECTID: {
    type: Number,
    required: true,
  },
  OCC_DATE: {
    type: String,
    required: true,
  },
  OCC_DAY: {
    type: Number,
    required: true,
  },
  OCC_DOW: {
    type: String,
    required: true,
  },
  OCC_DOY: {
    type: Number,
    required: true,
  },
  OCC_HOUR: {
    type: Number,
    required: true,
  },
  OCC_MONTH: {
    type: String,
    required: true,
  },
  OCC_YEAR: {
    type: Number,
    required: true,
  },
  OFFENCE: {
    type: String,
    required: true,
  },
  PREMISES_TYPE: {
    type: String,
    required: true,
  },
  REPORT_DATE: {
    type: String,
    required: true,
  },
  REPORT_DAY: {
    type: Number,
    required: true,
  },
  REPORT_DOW: {
    type: String,
    required: true,
  },
  REPORT_HOUR: {
    type: Number,
    required: true,
  },
  REPORT_MONTH: {
    type: String,
    required: true,
  },
  REPORT_YEAR: {
    type: Number,
    required: true,
  },
  UCR_CODE: {
    type: Number,
    required: true,
  },
  UCR_EXT: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.connection.useDb('TPC_Data_2014_2023').model("Data", TPCSchema, 'Data');
