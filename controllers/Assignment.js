const Assignment = require("../models/Assignment");
const twilio = require('twilio');
const cron = require('node-cron');
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
    
        // Schedule an SMS to be sent 3 hours before the due date of the assignment
        const dueDate = new Date(assignment.dueDate);
        const reminderDate = new Date(dueDate.getTime() - 3 * 60 * 60 * 1000);
        
        const body = `Reminder: You have an assignment due in 3 hours. Assignment name: ${assignment.name}. Due date: ${assignment.dueDate}.`;
        cron.schedule('30 8 * * *', async () => {
          try {
            // Send the SMS notification using Twilio
            await client.messages.create({
              body: body,
              from: "+15855361346",
              to: '+254791686851'
            });
            console.log(`SMS sent for class: ${title}`);
          } catch (error) {
            console.log(`Failed to send SMS for class: ${title}. Error: ${error}`);
          }
        });
    
        res.status(201).json(assignment);
      } catch (error) {
        res.status(400).json(error.message );
        console.log(error)
      }
    },
    
  
    // Get all assignments
    getAll: async (req, res) => {
      try {
        const assignments = await Assignment.find({});
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