(function() {
  var linkSchema, mongoose;

  mongoose = require('mongoose');

  linkSchema = mongoose.Schema({
    id: String,
    name: String,
    link: String,
    description: String,
    createdOn: Date
  });

  exports.linkModel = mongoose.model("LinkSchema", linkSchema);

}).call(this);
