const mongoose = require('mongoose');
var Schema = mongoose.Schema

const userSchema = new Schema({
      username: {type: String, required: true},
      email: {type: String, required: true},
      password: {type: String, required: true}
});

let User = mongoose.model('User', userSchema)

module.exports = User;