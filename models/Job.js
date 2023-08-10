const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide the Job Title"],
    },
    company: {
      type: String,
      required: [true, "Please provide the Company Name"],
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
