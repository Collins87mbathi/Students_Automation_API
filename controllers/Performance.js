const Performance = require("../models/Performance");


const createPerformances = async (req, res) => {
  try {
    const performances = req.body;
    performances.forEach((p) => {
      p.userId = req.user.id;
    });
    const savedPerformances = await Performance.insertMany(performances);
    res.status(201).json(savedPerformances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllPerformances = async (req, res) => {
  try {
    const userId = req.user.id;
    const performances = await Performance.find({ userId });
    res.status(200).json(performances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {getAllPerformances,createPerformances};