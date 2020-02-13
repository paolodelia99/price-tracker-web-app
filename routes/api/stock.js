const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();
const apiKey = process.env.ALPHA_API_KEY
const worldTradeApiKey = process.env.WORLD_TRADE_API_KEY

// @route    GET api/stock/getStock/:time_frame/:stock_name
// @desc     get price of a stock based on the requested timeframe
// @access   Public
router.get('/getStock/:time_frame/:stock_name',async (req,res)=>{

    let timeFrame = getTimeFrame(req.params.time_frame);

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

//get Time frame Function
const getTimeFrame = (timeFrame) =>{
    switch (timeFrame) {
        case 'daily':
            return 'TIME_SERIES_DAILY_ADJUSTED';
        case 'daily-adjusted':
            return 'TIME_SERIES_DAILY_ADJUSTED';
        case 'weekly':
            return 'TIME_SERIES_WEEKLY_ADJUSTED';
        case 'monthly':
            return 'TIME_SERIES_MONTHLY_ADJUSTED';
        default:
            return 'TIME_SERIES_DAILY_ADJUSTED';
    }
};

// @route    GET api/stock/getStockInfo/:stock_name
// @desc     search endpoint
// @access   Public
router.get('/getStockInfo/:stock_name', async (req,res)=>{
    try {
        await request(`https://api.worldtradingdata.com/api/v1/stock?symbol=${req.params.stock_name}&api_token=${worldTradeApiKey}`,
            (err,response,body)=> {
            const content = JSON.parse(body);

            res.json(content)
            })
    }catch (err) {
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
