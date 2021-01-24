const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    refreshToken: String,
    expires: Date,
    created: { type: Date, default: Date.now }

});

module.exports = mongoose.model('RefreshToken', schema);