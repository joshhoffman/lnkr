mongoose = require('mongoose')

linksSchema = mongoose.Schema {
    id: String,
    user: String,
    links: [
            name: String,
            link: String,
            description: String,
            createdOn: Date,
            tags: [String]
    	]
    }
}

exports.linksModel = mongoose.model "LinksSchema", linksSchema