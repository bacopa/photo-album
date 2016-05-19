var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var albumSchema = new mongoose.Schema({

	name: { type: String, required: true },
	photos: [{
		type: Schema.Types.ObjectId, ref: "Photo"
	}]

});

mongoose.model("Album", albumSchema);