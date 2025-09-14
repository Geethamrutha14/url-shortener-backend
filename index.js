const express = require('express');
const mongoose = require('mongoose');
const app = express();
const urlRoute = require('./routes/url.routes');

require('dotenv').config();

app.use(express.json());
app.use('/url',urlRoute);

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected...");
})
.catch( (err)=> console.log(err.message) );

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("Listening...");
})