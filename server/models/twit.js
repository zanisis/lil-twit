const mongoose = require('mongoose');
var Schema = mongoose.Schema

const twitSchema = new Schema({
    text: {type: String, required: true},
    tags: [{type: String, required: false}],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    created_at: {type: Date, required: false, default: Date.now}
});

let Twit = mongoose.model('Twit', twitSchema)

module.exports = Twit;