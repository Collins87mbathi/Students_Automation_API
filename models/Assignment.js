const mongoose = require('mongoose');
const { Schema } = mongoose;

const assignmentSchema = new Schema({
    userId: {
        type: String,
        required: true
      },
    title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Assignment', assignmentSchema);

