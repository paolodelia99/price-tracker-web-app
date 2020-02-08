const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');
const cryptoApiKey = config.get('CRYPTO_API_KEY');

// @route    GET api/crypto/exchange-rate/:from_currency/:to_currency
// @desc     get exchange rate
// @access   Public
router.get('/exchange-rate/:from_currency/:to_currency',async (req,res)=>{
    try{
        await request(`https://min-api.cryptocompare.com/data/generateAvg?fsym=${req.params.from_currency}&tsym=${req.params.to_currency}&e=Kraken&api_key${cryptoApiKey}`,
            (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route    GET api/crypto/getCrypto/:time_frame/:from_currency/:to_currency
// @desc     get data according to the requested timeframe
// @access   Public
router.get('/getCrypto/:time_frame/:crypto_simbol/:market',async (req,res)=>{

    let timeFrame = getTimeFrame(req.params.time_frame);

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

const getTimeFrame = (timeFrame) => {
    switch (timeFrame) {
        case 'daily':
            return 'DIGITAL_CURRENCY_DAILY';
        case 'weekly':
            return'DIGITAL_CURRENCY_WEEKLY';
        case 'monthly':
            return'DIGITAL_CURRENCY_MONTHLY';
        default:
            return'DIGITAL_CURRENCY_DAILY';
    }
};

module.exports = router;