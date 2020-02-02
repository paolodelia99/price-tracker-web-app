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

// @route    GET api/forex/intraday/:from_currency/:to_currency
// @desc     get intraday data
// @access   Public
router.get('/intraday/:from_currency/:to_currency',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${req.params.from_currency}&outputsize=compact&to_symbol=${req.params.to_currency}&interval=${req.body.interval}&apikey=${apiKey}`, (err,response, body) => {
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

// @route    GET api/forex/daily/:fromCurrency/:toCurrency
// @desc     get daily data
// @access   Public
router.get('/daily/:fromCurrency/:toCurrency',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=${req.params.fromCurrency}&outputsize=compact&to_symbol=${req.params.toCurrency}&apikey=${apiKey}`,
            async (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body);

            const content = JSON.parse(body);

            await res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/forex/weekly/:fromCurrency/:toCurrency
// @desc     get daily data
// @access   Public
router.get('/weekly/:fromCurrency/:toCurrency',async (req,res)=>{
    try{
        await request(
            `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${req.params.fromCurrency}&outputsize=compact&to_symbol=${req.params.toCurrency}&apikey=${apiKey}`,
            (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body);

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/forex/monthly/:fromCurrency/:toCurrency
// @desc     get monthly data
// @access   Public
router.get('/monthly/:fromCurrency/:toCurrency',async (req,res)=>{
    try{
        await request(
            `https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=${req.params.fromCurrency}&outputsize=compact&to_symbol=${req.params.toCurrency}&apikey=${apiKey}`,
            (err,response, body) => {
            console.log('error: ',err)
            console.log('statusCode:',response && response.statusCode);
            console.log('body:', body);

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;