const express = require('express');
const router = express.Router();
const users = require('../models/users');
const owners = require('../models/owners');
const tenants = require('../models/tenants');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
    console.log(req.body)
    users.findOne({ email: req.body.email }).then(person => {
        console.log(person.email)
        if (person) {
            if (person.password === req.body.password) {
                req.session.isAuth = true
                req.session.userID = person.get('_id')
                if (person.role === "owner") {
                    owners.findOne({ email: person.email }).then((result) => {
                        console.log(result.name)
                        res.send({ name: result.get('name'), role: person.role, email: person.email, properties: result.get('properties') })
                    })
                }
                else {
                    tenants.findOne({ email: person.email }).then((result) => {
                        res.send({ name: person.name, role: person.role, email: person.email, leaseStartDate: result.get('leaseStartDate'), leaseEndDate: result.get('leaseEndDate') })
                    })
                }
            }
        }
    }).catch(err => {
        res.sendStatus(401)
        console.log("person doesnt exist, error", err)
    })
});

router.post('/register', (req, res) => {
    // hashedPassword = bcrypt.hashSync(req.body.password, 10)
    // console.log(hashedPassword)
    const person = new users({
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
    })

    person.save().then((result) => {
        const owner = new owners({
            name: req.body.name,
            email: req.body.email,
            properties: []
        })
        owner.save().then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
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
        return res.send({ isAuth: true, userID: req.session.userID })
    }
    res.sendStatus(401)
})



module.exports = router;
