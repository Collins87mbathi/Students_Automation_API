const Assignment = require("../models/Assignment");


const assignmentController = {
    // Create a new assignment
    create: async (req, res) => {
      try {
        const assignment = new Assignment(req.body);
        assignment.userId = req.user.id;
        await assignment.save();
        res.status(201).json(assignment);
      } catch (error) {
        res.status(400).json({ error: error.message });
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