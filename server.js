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
      connectionString : process.env.DATABASE_URL,
      ssl : true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('it is working!');
})

app.post('https://powerful-caverns-38731.herokuapp.com/signin', signin.handleSignin(bcrypt,db))

app.post('https://powerful-caverns-38731.herokuapp.com/register', register.handleRegister(bcrypt,db))

app.get('https://powerful-caverns-38731.herokuapp.com/profile/:id',profile.handleProfileGet(db))

app.put('https://powerful-caverns-38731.herokuapp.com/image',image.handleImage(db))

app.post('https://powerful-caverns-38731.herokuapp.com/imageurl',image.handleApiCall)

app.listen(process.env.PORT||3001, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
})
