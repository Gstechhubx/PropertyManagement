const mongoose = require('mongoose');
// Building schema for each rental property

const propertiesSchema = new mongoose.Schema({
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
    address: { type: String, required: true },
    units: [{ type: mongoose.Schema.Types.ObjectId, ref: 'units' }],
});

const properties = mongoose.model('properties', propertiesSchema);

module.exports = properties;