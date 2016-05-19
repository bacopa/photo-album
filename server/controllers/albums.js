var mongoose = require("mongoose");

var Album = mongoose.model("Album");
var Photo = mongoose.model("Photo");
var moment = require("moment");

module.exports = (function(){

	return {

		create: function(req, res) {
			
			var album = new Album({
				name: req.body.name,
				photos: []
			});

			album.save(function(err, album){
				if(err) {
					console.log (err); 
				}
				res.send(album);
			})
		},

		getAll: function(req, res) {

			Album.find({})
			.populate("photos")
			.exec(function (err, albums) {
				if(err){
					res.send(err);
				}
				res.send(albums);
			});
		},

		getOne: function(req, res) {
			
			var id = req.params.albumId;

			Album.findOne({ _id: id })
				.populate("photos")
				.exec(function (err, albums) {
					if(err){
						res.send(err);
					}
					res.send(albums);
				});
		},

		createPhoto: function(req, res) {

			Album.findOne( { _id: req.params.albumId }, function (err, album) {

				var photo = new Photo({
					url: req.body.url,
					createdAt: moment().calendar(),
					_album: req.params.albumId
				});

				album.photos.push(photo);

				photo.save(function (err) {
					album.save(function (err) {
						if(err){
							console.log(err);
						}
						res.send(album);
					});
				});
			});
		},

		delete: function (req, res) {
			Album.findByIdAndRemove( req.params.albumId, function (err) {
				if(err){
					console.log(err);
				}
				res.send("Successfully Removed Album from DB");
			})
		}
	}

})();