const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const dbFilePath = path.join(__dirname, '../db/db.json');

module.exports = (app) => {

  // GET /api/notes: This will read the db.json file and return all saved notes as JSON.
  app.get('/api/notes', (req, res) => {
    fs.readFile(dbFilePath, (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const notes = JSON.parse(data);
      res.json(notes);
    });
  });

  // POST /api/notes: This will receive a new note to save on the request body.
  app.post('/api/notes', (req, res) => {
    // Read the contents of db.json file asynchronously
    fs.readFile(dbFilePath, (err, data) => {
      if (err) {
        console.error('Error reading db.json:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      let db = JSON.parse(data);

      // Creating a new variable called newNote and will extract title and text from request.body
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(), // Generate unique id for the new note
      };

      // Push the new note object into the existing array of notes
      db.push(newNote);

      // Write the updated array of notes back to db.json file
      fs.writeFile(dbFilePath, JSON.stringify(db), (err) => {
        if (err) {
          console.error('Error writing db.json:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Respond with the new note object
        res.json(newNote);
      });
    });
  });
};