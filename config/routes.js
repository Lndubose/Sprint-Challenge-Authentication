const axios = require('axios');

const { authenticate, generateToken } = require('./middlewares');

const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  const credentials = req.body;

  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(response => {
      return db('users')
        .where({ username: credentials.username })
        .first()
        .then(user => {
          const token = generateToken(user);
          res.status(201).json({ newUserId: user.IDBCursor, token });
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      if (err.errno === 19) {
        res.status(409).json({ message: 'Username already used.' });
      } else {
        res.status(500).json({ error: `Server error --> ${err}` });
      }
    });
}

function login(req, res) {
  // implement user login
  const creds = req.body;

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken();
        res.status(200).json({ id: user.id, username: user.username, token });
      } else {
        res
          .status(401)
          .json({ message: 'Incorrect username and/or password.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: `Server error --> ${err}` });
    });
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
