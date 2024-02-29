
const path = require('path');
const fs = require('fs')

// npm package that allows for unique ids to be created
var uniqid = require('uniqid');

module.exports = (app) => {

  // GET /api/notes read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
  });

  // POST /api/notes receives a new note to save on the request body, 

  app.post('/api/notes', (req, res) => {
    const db = fs.readFileSync('db/db.json');
    db = JSON.parse(db);
    res.json(db);

    // creating body for note
    const newNote = {
      title: req.body.title,
      text: req.body.text,

      // creates unique id for each note
      id: uniqid(),
    };
    // push note to be written in the db.json file
    db.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(db));
    res.json(db);

  });

}