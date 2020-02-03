const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const apiKey = config.get('ALPHA_API_KEY');

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