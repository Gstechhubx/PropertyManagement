const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        index: true,
        required: true,
        ref: 'loginCreds'

    },
    houses: [{

        house_name: String,
        tenant_type: {
            type: String,
            default: 'family',
            enum: ['family', 'bachelor', 'other']

        },
        rent: Number,
        capacity: Number,
        ispaid: {
            type: Boolean,
            default: false
        },
        issues: [{
            issue: String,
            isresolved: Boolean
        }]
    }],

})
const propertyModel = new mongoose.model('property', propertySchema);

module.exports = propertyModel;