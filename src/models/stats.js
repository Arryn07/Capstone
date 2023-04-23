const mongoose = require("mongoose")

const statsSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        maxlength: 5,
    },
    email: {
        type: String,
        required: true,
    },
    games: {
        type: String,
        required: true,
        maxlength: 5,
    },
    atBats: {
        type: String,
        required: true,
        maxlength: 5,
    },
    runs: {
        type: String,
        required: true,
        maxlength: 5,
    },
    hits: {
        type: String,
        required: true,
        maxlength: 5,
    },
    singles: {
        type: String,
        required: true,
        maxlength: 5,
    },
    doubles: {
        type: String,
        required: true,
        maxlength: 5,
    },
    triples: {
        type: String,
        required: true,
        maxlength: 5,
    },
    hr: {
        type: String,
        required: true,
        maxlength: 5,
    },
    rbi: {
        type: String,
        required: true,
        maxlength: 5,
    },
    bb: {
        type: String,
        required: true,
        maxlength: 5,
    },
    so: {
        type: String,
        required: true,
        maxlength: 5,
    },
    sb: {
        type: String,
        required: true,
        maxlength: 5,
    },
},
{timestamps: true})

module.exports = mongoose.model('Stats', statsSchema)
