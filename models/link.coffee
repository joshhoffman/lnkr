mongoose = require('mongoose')

linkSchema = mongoose.Schema {
    name: String,
    link: String,
    description: String
}

exports.linkModel = mongoose.model "LinkSchema", linkSchema