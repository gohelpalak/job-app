
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/job-app")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose