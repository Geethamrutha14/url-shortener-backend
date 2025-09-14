const {nanoid} = require('nanoid');
const Url = require('../models/url');


async function handleUrlGeneration(req,res){
    const body = req.body;

    if(!body.url) return res.status(400).json({ error : "url is required..." });
    const shortId = nanoid(8);
    await Url.create({
        shortId : shortId,
        redirectUrl : body.url,
        visitHistory : []
    })

    return res.json({shortId : shortId});
}

module.exports = {
    handleUrlGeneration
};