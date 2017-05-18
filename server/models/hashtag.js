var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var tagSchema = new Schema({
  tag: {type: String, required: true},
  count : {type: Number, default : 1},
  twit: [{type: Schema.Types.ObjectId, ref: 'Twit'}]
})

var Tag = mongoose.model('Tag', tagSchema)

module.exports = Tag;