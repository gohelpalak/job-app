
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://gohelpalak14:palak%4022@cluster0.cjwxl.mongodb.net/job-app")
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose
