const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
  },
  lecturer: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Class', classSchema);


