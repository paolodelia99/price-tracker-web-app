const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');

//fixme: unica routes con un switch con tutti i timeFrame

// @route    GET api/crypto/exchange-rate/:from_currency/:to_currency
// @desc     get exchange rate
// @access   Public
router.get('/exchange-rate/:from_currency/:to_currency',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${req.params.from_currency}&to_currency=${req.params.to_currency}&apikey=${apiKey}`, (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body)

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/crypto/daily/:from_currency/:to_currency
// @desc     get daily data
// @access   Public
router.get('/daily/:crypto_simbol/:market',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${req.params.crypto_simbol}&outputsize=compact&market=${req.params.market}&apikey=${apiKey}`, (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body)

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/crypto/weekly/:from_currency/:to_currency
// @desc     get weekly data
// @access   Public
router.get('/weekly/:crypto_simbol/:market',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${req.params.crypto_simbol}&outputsize=compact&market=${req.params.market}&apikey=${apiKey}`, (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body)

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/crypto/monthly/:from_currency/:to_currency
// @desc     get monthly data
// @access   Public
router.get('/monthly/:crypto_simbol/:market',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${req.params.crypto_simbol}&outputsize=compact&market=${req.params.market}&apikey=${apiKey}`, (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body)

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;