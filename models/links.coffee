mongoose = require('mongoose')

linksSchema = mongoose.Schema {
    user: String,
    links: [
        id: String,
        name: String,
        link: String,
        description: String,
        createdOn: Date,
        tags: [String]
   	]
}

exports.linksModel = mongoose.model "LinksSchema", linksSchema