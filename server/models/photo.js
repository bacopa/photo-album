var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var photoSchema = new mongoose.Schema({

	url: { type: String, required: true },
	description: { type: String },
	createdAt: { type: String },
	_album: {
		type: Schema.Types.ObjectId, ref: "Album" 
	}

});

mongoose.model("Photo", photoSchema);