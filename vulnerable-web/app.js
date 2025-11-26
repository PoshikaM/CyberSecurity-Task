const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'data', 'comments.sqlite');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// intentionally *not sanitizing* inputs for teaching stored XSS
app.get('/', (req, res) => {
  const db = new sqlite3.Database(DB_FILE);
  db.all('SELECT * FROM comments ORDER BY id DESC LIMIT 50', (err, rows) => {
    db.close();
    if (err) return res.status(500).send('DB error');
    res.render('index', { comments: rows });
  });
});

app.post('/comment', (req, res) => {
  const { name = 'anon', comment = '' } = req.body;
  const db = new sqlite3.Database(DB_FILE);
  db.run('INSERT INTO comments(name, comment) VALUES(?, ?)', [name, comment], (err) => {
    db.close();
    if (err) return res.status(500).send('DB error');
    res.redirect('/');
  });
});

app.listen(PORT, () => {
  console.log(`Vulnerable app running on port ${PORT}`);
});
