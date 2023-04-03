const mongoose = require('mongoose');

const credSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    role: {
        type: String,
        default: 'tenant'
    }
})
const loginCreds = new mongoose.model('logincreds', credSchema);

module.exports = loginCreds;