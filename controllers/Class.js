const moment = require('moment/moment');
const Class = require('../models/Class');

// Get all classes
const getAllClass = async (req, res) => {
    try {
      const userId = req.user.id; // Get the userId from the middleware
      const classes = await Class.find({ userId }); // Filter classes by userId
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getUpcomingClasses = async (req, res) => {
  try {
    const userId = req.user.id;
    const currentDay = moment().format('dddd'); // Get the current day
    const classes = await Class.find({ userId, day: currentDay }).sort({ time: 1 }); // Filter classes by userId and current day, and sort them by time
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  
// Create a new class
const createClass = async (req, res) => {
    try {
      const classes = new Class(req.body);
      classes.userId = req.user.id; // Add userId to the classes object
      await classes.save();
      res.status(201).json(classes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// Update a class
const updateClass = async (req, res) => {
  try {
    const classes = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!classes) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a class
const deleteClass = async (req, res) => {
  try {
    const classes = await Class.findByIdAndDelete(req.params.id);
    if (!classes) {
      return res.status(404).json({ error: 'Class not found' });
    }
    res.status(200).json({ message: 'Class deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {getAllClass,updateClass,deleteClass,createClass,getUpcomingClasses};