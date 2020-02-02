const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');

//fixme: unica routes con un switch con tutti i timeFrame

// @route    GET api/stock/weekly/:stock_name
// @desc     get weekly price of a stock
// @access   Public
router.get('/weekly/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${req.params.stock_name}&outputsize=compact&apikey=${apiKey}`, (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/stock/weekly-adjusted/:stock_name
// @desc     get weekly adjusted price of a stock
// @access   Public
router.get('/weekly-adjusted/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${req.params.stock_name}&outputsize=compact&apikey=${apiKey}`, (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/stock/monthly/:stock_name
// @desc     get monthly price of a stock
// @access   Public
router.get('/monthly/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${req.params.stock_name}&outputsize=compact&apikey=${apiKey}`, (err,response, body) => {

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/stock/weekly/:stock_name
// @desc     get monthly adjusted price of a stock
// @access   Public
router.get('/monthly-adjusted/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${req.params.stock_name}&outputsize=compact&apikey=${apiKey}`, (err,response, body) => {
            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/stock/daily/:stock_name
// @desc     get daily price of a stock
// @access   Public
router.get('/daily/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.stock_name}&outputsize=compact&apikey=${apiKey}`, (err,response, body) => {

            const content = JSON.parse(body);

            res.json(content)
        })
    }catch (e) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/stock/daily-adjusted/:stock_name
// @desc     get daily price of a stock
// @access   Public
router.get('/daily-adjusted/:stock_name',async (req,res)=>{
    try{
        await request(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.params.stock_name}&apikey=${apiKey}`, (err,response, body) => {
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