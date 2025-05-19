const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database/db');


app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());


app.use('/api/jobs', require('./routes/jobs'));

const PORT = 5001;
app.listen(PORT, () => console.log(`server is running on port http://localhost/${PORT}`)); 