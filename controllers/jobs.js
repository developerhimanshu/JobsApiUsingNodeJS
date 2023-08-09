const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});

  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
  const job = await Job.findOne({ _id: req.params.id });

  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  // const { title, description, company, salary } = req.body;
  const job = await Job.create({ ...req.body });
  console.log(job);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  res.send("update Job");
};

const deleteJob = async (req, res) => {
  const job = await Job.deleteOne({ _id: req.params.id });
  res.status(StatusCodes.OK).json(job);
};

module.exports = {
  getJob,
  getAllJobs,
  createJob,
  updateJob,
  deleteJob,
};
