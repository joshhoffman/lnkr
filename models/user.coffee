mongoose = require 'mongoose'

userSchema = mongoose.Schema {
    username: String,
    password: String,
    displayname: String
}

exports.userModel = mongoose.model "UserSchema", userSchema