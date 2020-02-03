const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');

// @route    GET api/crypto/exchange-rate/:from_currency/:to_currency
// @desc     get exchange rate
// @access   Public
router.get('/exchange-rate/:from_currency/:to_currency',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${req.params.from_currency}&to_currency=${req.params.to_currency}&apikey=${apiKey}`, (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/crypto/:time_frame/:from_currency/:to_currency
// @desc     get data according to the requested timeframe
// @access   Public
router.get('/:time_frame/:crypto_simbol/:market',async (req,res)=>{

    let timeFrame;

    switch (req.params.time_frame) {
        case 'daily':
            timeFrame = 'DIGITAL_CURRENCY_DAILY';
            break;
        case 'weekly':
            timeFrame = 'DIGITAL_CURRENCY_WEEKLY';
            break;
        case 'monthly':
            timeFrame = 'DIGITAL_CURRENCY_MONTHLY';
            break;
        default:
            timeFrame = 'DIGITAL_CURRENCY_DAILY';
    }

    try{
        await request(`https://www.alphavantage.co/query?function=${timeFrame}&symbol=${req.params.crypto_simbol}&outputsize=compact&market=${req.params.market}&apikey=${apiKey}`, (err,response, body) => {

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;