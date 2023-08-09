const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the Job Title"],
  },
  description: {
    type: String,
    required: [true, "Please Provide the Job Description"],
  },
  company: {
    type: String,
    required: [true, "Please provide the Company Name"],
  },
  salary: {
    type: String,
    required: [true, "Please provide the Salary"],
  },
});

module.exports = mongoose.model("Job", JobSchema);
