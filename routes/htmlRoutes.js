const path = require('path');

module.exports = function (app) {
// Route to serve the index.html
	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/index.html'));
	});

//Route to serve the notes.html
	app.get('/notes', function (req, res) {
		res.sendFile(path.join(__dirname, '../public/notes.html'));
	});
};