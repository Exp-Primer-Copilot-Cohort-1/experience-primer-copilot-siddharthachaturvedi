// Create web server and listen on port 3000
// Use express to handle routing and serve static files
// Use body-parser to parse request body
// Use fs to read and write to file
// Use path to resolve file paths
// Use uuid to generate unique ids

// Load modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const uuid = require('uuid/v4');

// Create web server
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static('public'));

// Use body-parser to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET /comments
app.get('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments');
        }

        res.json(JSON.parse(data));
    });
});

// POST /comments
app.post('/comments', (req, res) => {
    // Read comments from file
    fs.readFile(path.resolve(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments');
        }

        const comments = JSON.parse(data);
        const comment = req.body;
        comment.id = uuid();
        comments.push(comment);

        // Write comments to file
        fs.writeFile(path.resolve(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error writing comments');
            }

            res.json(comment);
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
