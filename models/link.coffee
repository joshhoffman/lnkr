mongoose = require('mongoose')

linkSchema = mongoose.Schema {
    id: String,
    name: String,
    link: String,
    description: String,
    createdOn: Date,
    tags: [String]
}

exports.linkModel = mongoose.model "LinkSchema", linkSchema