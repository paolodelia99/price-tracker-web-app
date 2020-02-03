const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');

//fixme: unica routes con un switch con tutti i timeFrame

// @route    GET api/forex/exchange-rate/:from_currency/:to_currency
// @desc     get exchange rate
// @access   Public
router.get('/exchange-rate/:from_currency/:to_currency',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${req.params.from_currency}&to_currency=${req.params.to_currency}&apikey=${apiKey}`,
            (err,response, body) => {

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/forex/:time_frame/:from_currency/:to_currency
// @desc     get data ccording to the requested timeframe
// @access   Public
router.get('/:time_frame/:from_currency/:to_currency',async (req,res)=>{

    let timeFrame;

    switch (req.params.time_frame) {
        case 'daily':
            timeFrame = 'FX_DAILY';
            break;
        case 'weekly':
            timeFrame = 'FX_WEEKLY';
            break;
        case 'monthly':
            timeFrame = 'FX_MONTHLY';
            break;
        default:
            timeFrame = 'FX_DAILY';
    }

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

module.exports = router;