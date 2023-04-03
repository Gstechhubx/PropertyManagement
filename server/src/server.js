const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongodb-session')(session);
require("dotenv").config({ path: '../.env' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbURI = process.env.MONGODB_URI;
const store = new mongoStore({
    uri: dbURI,
    collection: "currentSessions",
});
app.use(
    session({
        store: store,
        secret: process.env.mongoStoreSECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 3600000 } // 1 hour
    })
);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true

}));

app.use('/auth', require('./routes/users'));
app.use('/property', require('./routes/property'));
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to db'))
    .catch((err) => console.log(err));

app.listen(9000, () => console.log("Server started on 9000 port"))