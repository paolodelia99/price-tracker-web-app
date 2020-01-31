const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    stocks : {
        type: Array,
        required: true,
        default: []
    },
    crypto : {
        type: Array,
        required: true,
        default: []
    },
    forex : {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('Profile',ProfileSchema);