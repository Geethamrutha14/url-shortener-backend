const express = require('express');
const mongoose = require('mongoose');
const app = express();
const urlRoute = require('./routes/url.routes');
const Url = require('./models/url');

require('dotenv').config();

app.use(express.json());
app.use('/url',urlRoute);

app.get('/:shortId',async (req,res)=>{
   try {
        const shortId = req.params.shortId;
        const entry = await Url.findOneAndUpdate( 
            {shortId},
            {$push : {visitHistory : {timestamp : Date.now()}}}
        );

        if(!entry) return res.json({error : "short id not found!!!"});

        return res.redirect(entry.redirectUrl);
    
   } catch (error) {
    console.log(error.message);
    return res.status(500).json({error : "something went wrong!!!"});
   }
})

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected...");
})
.catch( (err)=> console.log(err.message) );

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("Listening...");
})