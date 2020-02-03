const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');

//fixme: unica routes con un switch con tutti i timeFrame

// @route    GET api/stock/:time_frame/:stock_name
// @desc     get price of a stock based on the requested timeframe
// @access   Public
router.get('/:time_frame/:stock_name',async (req,res)=>{

    let timeFrame;

    switch (req.params.time_frame) {
        case 'daily':
            timeFrame = 'TIME_SERIES_DAILY_ADJUSTED';
            break;
        case 'daily-adjusted':
            timeFrame = 'TIME_SERIES_DAILY_ADJUSTED';
            break;
        case 'weekly':
            timeFrame = 'TIME_SERIES_WEEKLY_ADJUSTED';
            break;
        case 'monthly':
            timeFrame = 'TIME_SERIES_MONTHLY_ADJUSTED';
            break;
        default:
            timeFrame = 'TIME_SERIES_DAILY_ADJUSTED';
    }

    try{
        await request(`https://www.alphavantage.co/query?function=${timeFrame}&symbol=${req.params.stock_name}&outputsize=compact&apikey=${apiKey}`,
            (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/stock/search/:stock_name
// @desc     search endpoint
// @access   Public
router.get('/search/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${req.params.stock_name}&apikey=${apiKey}`,
            (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;