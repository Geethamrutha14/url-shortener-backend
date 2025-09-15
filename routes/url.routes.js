const express = require('express');
const { handleUrlGeneration , handleAnalytics } = require('../controllers/url.controller');
const router = express.Router();

//get the url and send the shortened url back...
// rem operations and are stored in contorllers and it would be used here...

router.post('/',handleUrlGeneration);
router.get('/analytics/:shortId',handleAnalytics);

module.exports = router;