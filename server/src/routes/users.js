const express = require('express');
const router = express.Router();
const loginCreds = require('../models/loginCreds');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    console.log(req.body)
    var person = await loginCreds.findOne({ email: req.body.email })
    // console.log(person)
    if (person) {
        if (person.password === req.body.password) {
            req.session.isAuth = true
            req.session.userID = person.get('_id')
            res.send({ name: person.name, role: person.role, email: person.email })
            // res.sendStatus(200)
        }
        // res.sendStatus(401)
    } else {
        res.sendStatus(401)
        console.log("person doesnt exist")
    }
});

router.post('/register', (req, res) => {
    // hashedPassword = bcrypt.hashSync(req.body.password, 10)
    // console.log(hashedPassword)
    const person = new loginCreds({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
    })

    person.save().then((result) => {
        res.sendStatus(200)
    }).catch((err) => {
        res.sendStatus(500)
        console.error(err)
    })

})

router.post("/logout", (req, res) => {
    req.session.isAuth = false
    req.session.destroy()
    res.sendStatus(200)
})

router.get('/login', (req, res) => {
    if (req.session.isAuth) {
        return res.sendStatus(200)
    }
    res.sendStatus(401)
})



module.exports = router;
