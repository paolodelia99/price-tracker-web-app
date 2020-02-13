const express = require('express');
const router = express.Router();
const request = require('request');
require('dotenv').config();
const apiKey = process.env.ALPHA_API_KEY;

// @route    GET api/forex/exchange-rate/:from_currency/:to_currency
// @desc     get exchange rate
// @access   Public
router.get('/exchange-rate/:from_currency/:to_currency',async (req,res)=>{
    try{
        await request(`https://api.ratesapi.io/api/latest?base=${req.params.from_currency}&symbols=${req.params.to_currency}`,
            (err,response, body) => {

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/forex/getForex/:time_frame/:from_currency/:to_currency
// @desc     get data ccording to the requested timeframe
// @access   Public
router.get('/getForex/:time_frame/:from_currency/:to_currency',async (req,res)=>{

    let timeFrame = getTimeFrame(req.params.time_frame);

    try{
        await request(`https://www.alphavantage.co/query?function=${timeFrame}&from_symbol=${req.params.from_currency}&to_symbol=${req.params.to_currency}&outputsize=compact&apikey=${apiKey}`,
            (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


const getTimeFrame = (timeFrame) => {
    switch (timeFrame) {
        case 'daily':
            return 'FX_DAILY';
        case 'weekly':
            return 'FX_WEEKLY';
        case 'monthly':
            return 'FX_MONTHLY';
        default:
            return 'FX_DAILY';
    }
};

module.exports = router;
