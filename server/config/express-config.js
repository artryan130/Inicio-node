
require('dotenv').config();

const express = require('express');

const app= express();

app.use(express.urlencoded({
    extended:true
}));

const cors = require('cors');
app.use(cors());



app.use(express.json());

module.exports = app;

const usersRouter = require('../users/controller/user-controller');
app.use('/users', usersRouter);