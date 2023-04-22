const moment = require('moment/moment');
const Class = require('../models/Class');


// Get all classes
const getAllClass = async (req, res) => {
    try {
      const userId = req.user.id;
      const classes = await Class.find({ userId }); 
      res.status(200).json(classes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const getUpcomingClasses = async (req,res) => {
    try {
      const userId = req.user.id;
      const currentDay = moment().format('dddd');
      const classes = await Class.find({ userId, day: currentDay }).sort({ time: 1 });
      for (let i = 0; i < classes.length; i++) {
        const { title, time, lecturer } = classes[i];

        cron.schedule('30 8 * * *',(async ()=>{
          const message = `You have a class on ${currentDay} at ${time}. The class is ${title} and your lecturer is ${lecturer}.`;
          try {
        
            await client.messages.create({
              body: message,
              from: "+15855361346",
              to: '+254791686851'
            });
            console.log(`SMS sent for class: ${title}`);
          } catch (error) {
            console.log(`Failed to send SMS for class: ${title}. Error: ${error}`);
          }
        }));  
      }
      res.status(200).json(classes);
    } catch (err) {
      console.log(`Failed to get upcoming classes. Error: ${err}`);
    }
  };
  
// Create multiple classes
const createClasses = async (req, res) => {
  try {
    const classes = req.body;
    classes.forEach((c) => {
      c.userId = req.user.id;
    });
    const savedClasses = await Class.insertMany(classes);

    res.status(201).json(savedClasses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

  
  
// Create a new class
const createClass = async (req, res) => {
    try {
      const classes = new Class(req.body);
      classes.userId = req.user.id; 
      await classes.save();
      res.status(201).json(classes);
    } catch (err) {
      res.status(500).json({ error: err });
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


module.exports = {getAllClass,updateClass,deleteClass,createClass,createClasses,getUpcomingClasses};