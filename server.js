const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors=require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABSE_URL,
      ssl : 'true'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('it is working!');
})

app.post('/signin', signin.handleSignin(bcrypt,db))

app.post('/register', register.handleRegister(bcrypt,db))

app.get('/profile/:id',profile.handleProfileGet(db))

app.put('/image',image.handleImage(db))

app.post('/imageurl',image.handleApiCall)


app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
