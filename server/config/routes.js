var albums = require("./../controllers/albums.js");
var photos = require("./../controllers/photos.js");

module.exports = function(app) {

	app.post("/album", function (req, res) {
		albums.create(req, res);
	});

	app.get("/albums", function (req, res) {
		albums.getAll(req, res);
	});

	app.get("/album/:albumId", function (req, res) {
		albums.getOne(req, res);
	});

	//create photo belonging to album
	app.post("/album/:albumId", function (req, res) {
		albums.createPhoto(req, res);
	});

	//create photo without belonging to album
	app.post("/photo", function (req, res) {
		photos.create(req, res);
	})

	app.get("/photos", function (req, res) {
		photos.getAll(req, res);
	});

	app.get("/photo/:photoId", function (req, res) {
		photos.getOne(req, res);
	});

	app.delete("/photo/:photoId", function (req, res) {
		photos.delete(req, res);
	});

	app.delete("/album/:albumId", function (req, res) {
		albums.delete(req, res);
	});

	//add image to album
	app.put("/photo/:photoId/album/:albumId", function (req, res) {
		photos.addImageToAlbum(req, res);
	});

	app.put("/photo/update/:photoId", function (req, res) {
		photos.updateDescription(req, res);
	})

	//remove image from album
	app.put("/photo/:photoId/remove/album/:albumId", function (req, res) {
		photos.removeImageFromAlbum(req, res);
	});


}
