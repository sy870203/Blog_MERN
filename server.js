const express = require('express');

const bodyParser = require('body-parser');
const logger = require('morgan');

const mongoose = require('mongoose');



const app = express();


// 데이터베이스 연결

const dbAdress = "mongodb+srv://admin:tmdduf23@cluster0.gv7zv.mongodb.net/blog?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbAdress, options)
    .then(() => console.log("mongoDB connected ..."))
    .catch(err => console.log(err.message));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));





const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));