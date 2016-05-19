var expect = require("chai").expect;
var Album = require("../../server/models/album");

const mongoose = require('mongoose');
const dbUrl = 'mongodb://localhost/photo-album-test';

before(function(cb) {
  mongoose.connection.close(function() {
    mongoose.connect(dbUrl, cb);
  });
});

after(function(cb) {
  mongoose.connection.close(cb);
}); 

//before unit tests, create album "bunnies"
beforeEach(function (cb) {

	var album = new Album({
		name: "bunnies",
		photos: []
	});

	album.save(function(err, album){
		if(err) {
		 cb(err) 
		}
		cb(album);
	})
	console.log(album);
});

describe("Album", function () {

	describe(".create()", function () {
		it("should create a new album in the db", function (cb) {
			
			var newAlbum = {
				name: "platypodes",
				photos: []
			};

			Album.create(newAlbum, function (err, album) {
				console.log("album:", album);
			});
			expect(err).to.not.exist;
			expect(album).to.exist;

			cb();
		});
	});

})