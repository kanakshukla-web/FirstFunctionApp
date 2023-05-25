const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const MetaData = new Schema({
    name: { type: String },
    firstHitOn: { type: Date, default: null },
    lastHitOn: { type: Date, default: null }
}, { versionKey: false });

const Metadata = mongoose.model('Metadata', MetaData);

module.exports = Metadata;