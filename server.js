const express = require('express');

const bodyParser = require('body-parser');
const logger = require('morgan');

const dotenv = require('dotenv');
dotenv.config();

const userRoutes = require('./routes/user');


const app = express();

// Connect to database
const connectDB = require('./config/db');
connectDB();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));

app.use('/user', userRoutes);




const PORT = process.env.PORT || 7000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));