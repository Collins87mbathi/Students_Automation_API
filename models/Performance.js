const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
  unitCode: {
    type: String,
    required: true,
  },
  unitTitle: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Performance', PerformanceSchema);
