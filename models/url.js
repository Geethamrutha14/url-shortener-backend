const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
    shortId : {
        type : String,
        required : true,
        unique : true,
    },
    redirectUrl : {
        type : String,
        required : true,
    },
    visitHistory : [{ timestamp : {type : Number} }],
},
{timestamps : true}
)

const Url = mongoose.model('Url',urlschema);

module.exports = Url;
