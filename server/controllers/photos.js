var mongoose = require("mongoose");
var moment = require("moment");
var Album = mongoose.model("Album");
var Photo = mongoose.model("Photo");


module.exports = (function(){

	return {

		getAll: function (req, res) {
			Photo.find({}, function (err, data) {
				if(err){
					res.send(err);
				}
				res.send(data);
			});
		},

		getOne: function (req, res) {
			Photo.findById(req.params.photoId, function (err, data) {
				if(err){
					res.send(err);
				}
				res.send(data);
			});
		},

		delete: function (req, res) {
			Photo.findByIdAndRemove( req.params.photoId, function (err) {
				if(err){
					console.log(err);
				}
				res.send("Successfully Removed Photo from DB");
			});
		},

		create: function (req, res) {

			var photo = new Photo ({
				url: req.body.url,
				description: req.body.description,
				createdAt: moment().calendar()
			});

			photo.save(function (err, photo) {
				if(err){
					res.send(err);
				}
				res.send(photo);
			});
		},

		addImageToAlbum: function (req, res) {

			var albumId = req.params.albumId;
			var photoId = req.params.photoId;

			Album.findOne( { _id: albumId }, function (err, album) {

				if(err){ console.log(err) }

				album.photos.push(photoId);
				
				album.save(function (err) {
					if(err){ console.log(err) }
					Photo.findOne({ _id: photoId }, function (err, photo) {

						photo.album = albumId;

						photo.save(function (err, photo) {
							if(err) { res.send(err) }
							res.send(photo);
						});
					});
				});	
			});
		},

		removeImageFromAlbum: function (req, res) {

			var albumId = req.params.albumId;
			var photoId = req.params.photoId;

			Album.findOne( { _id: albumId }, function (err, album) {

				if(err){ console.log(err) }

				var idx = album.photos.indexOf(photoId);
				album.photos.splice(idx, 1);
				
				album.save(function (err) {
					if(err){ console.log(err) }
					Photo.findOne({ _id: photoId }, function (err, photo) {

						photo.album = [];

						photo.save(function (err, photo) {
							if(err) { res.send(err) }
							res.send(photo);
						});
					});
				});	
			});			
		},

		updateDescription: function (req, res) {
			
			var description = req.body.description;
			var id = req.params.photoId;
			
			Photo.findByIdAndUpdate( id, { $set: { description: description } }, function (err, photo) {
				if(err) { console.log(err) }
				res.send(photo);
			});
		}

	}

})();