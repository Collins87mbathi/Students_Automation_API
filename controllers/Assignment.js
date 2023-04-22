const Assignment = require("../models/Assignment");
const cron = require('node-cron');
const twilio = require('twilio');
const accountSid = 'AC2bfe4bf126f9f98cf620f73959563da6';
const authToken = '151c47aeccba0898f23afb73cde2bc7e';
const client = twilio(accountSid, authToken);


const assignmentController = {
    // Create a new assignment
    create: async (req, res) => {
      try {
        const assignment = new Assignment(req.body);
        assignment.userId = req.user.id;
        await assignment.save();  
        res.status(201).json(assignment);
      } catch (error) {
        res.status(400).json(error.message );
        console.log(error)
      }
    },
    
  
    // Get all assignments
    getAll: async (req, res) => {
      let userId = req.user.id;
      try {
      
        const assignments = await Assignment.find({ userId });
        res.status(200).json(assignments);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
     
    // Update an assignment by ID
    update: async (req, res) => {
      try {
        const assignment = await Assignment.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
        if (!assignment) {
          res.status(404).json({ error: 'Assignment not found' });
        } else {
          res.status(200).json(assignment);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    // Delete an assignment by ID
    delete: async (req, res) => {
      try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
          res.status(404).json({ error: 'Assignment not found' });
        } else {
          res.status(200).json({ message: 'Assignment deleted successfully' });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  };
  
  module.exports = assignmentController;