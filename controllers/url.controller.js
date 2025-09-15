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

async function handleAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});

    if(!result) return res.status(404).json({error : "no url found!!!"});

    const totalClicks = result.visitHistory.length;
    const lastVisited = totalClicks > 0 ? new Date(result.visitHistory[totalClicks-1].timestamp) : null ;

    return res.json({
        shortId : result.shortId,
        clicks : totalClicks,
        analytics : result.visitHistory,
        lastVisited,
    });
}

module.exports = {
    handleUrlGeneration,
    handleAnalytics
};