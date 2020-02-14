const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../../middleware/auth');
const {validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['firstName', 'lastName']
        );

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    POST api/profile
// @desc     Create user profile
// @access   Private
router.post(
    '/',
    [
        auth
    ],
    async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const profileFields = {};
        profileFields.user = req.user.id;

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true, upsert: true }
            );

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    POST api/profile/newStock/
// @desc     Adding new stock
// @access   Private
router.post('/newStock', auth, async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newStock = {
            _id:  mongoose.Types.ObjectId(),
            stockName: req.body.newStock
        };

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $push:{ stocks: newStock}},
                { new: true, upsert: false }
            );

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/profile/newForex/
// @desc     Adding new forex
// @access   Private
router.post('/newForex', auth, async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //forexName: "fromCurrency/toCurrency"
        const newForex = {
            _id: mongoose.Types.ObjectId(),
            forexName: req.body.newForex
        }

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $push:{ forex: newForex}},
                { new: true, upsert: false }
            );

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);


// @route    POST api/profile/newCrypto/
// @desc     Adding new crypto
// @access   Private
router.post('/newCrypto/', auth, async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //cryptoName : "cryptoCurrency/Market"
        const newCrypto = {
            _id: mongoose.Types.ObjectId(),
            cryptoName: req.body.newCrypto
        }

        try {
            // Using upsert option (creates new doc if no match is found):
            let profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $push:{ crypto: newCrypto}},
                { new: true, upsert: false }
            );

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/profile/deleteStock/:id
// @desc     Delete a stock
// @access   Private
router.delete('/deleteStock/:id', auth, async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            Profile.findOne({ user: req.user.id })
                .then( profile => {
                    profile.stocks.pop({
                        _id: req.params.id
                    });

                    profile.save()
                        .then(profile => res.json(profile))
                })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/profile/deleteForex/:id
// @desc     Delete forex
// @access   Private
router.delete('/deleteForex/:id', auth, async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            Profile.findOne({ user: req.user.id })
                .then( profile => {
                    profile.forex.pop({
                        _id: req.params.id
                    });

                    profile.save()
                        .then(profile => res.json(profile))
                })
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route    POST api/profile/deleteCrypto/:id
// @desc     Delete  crypto
// @access   Private
router.delete('/deleteCrypto/:id', auth, async (req,res)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            Profile.findOne({ user: req.user.id })
                .then( profile => {
                    profile.crypto.pop({
                        _id: req.params.id
                    });

                    profile.save()
                        .then(profile => res.json(profile))
                })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
