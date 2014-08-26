mongoose = require 'mongoose'

userSchema = mongoose.Schema {
    email: String,
    password: String,
    displayName: String,
    roles: [String]
}

exports.userModel = mongoose.model "UserSchema", userSchema