const express = require('express');
const router = express.Router();
const properties = require('../models/properties');
const checkAuth = require('../middlewares/checkAuth');
router.post('/addhouse', (req, res) => {
    properties.findOne({ userID: req.session.userID }).then((result) => {
        console.log(result);
        if (result) {
            properties.updateOne({ userID: req.session.userID }, {
                $push: {
                    houses: {
                        house_name: req.body.house_name,
                        tenant_type: req.body.tenant_type,
                        rent: req.body.rent,
                        capacity: req.body.capacity,
                    }
                }
            }).then((result) => {
                console.log(result, "in update")
                // res.send("Hello")
            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            const newRoom = new properties({
                userID: req.session.userID,
                houses: [{
                    house_name: req.body.house_name,
                    tenant_type: req.body.tenant_type,
                    rent: req.body.rent,
                    capacity: req.body.capacity,
                }]
            })
            newRoom.save()
            console.log(req.body, "in new room")
            // res.send("Hello")
        }
    }).catch((err) => {
        console.log(err)
    })
    console.log(req.body, "in add room")
    res.send("Hello")
});

router.get('/houses', checkAuth, (req, res) => {
    properties.findOne({ userID: req.session.userID })
        .then((result) => {
            console.log(result, "in houses")
            res.json(result)
        })
        .catch((err) => {
            console.log(err)
        })
});



router.get('/houses/:id', (req, res) => {
    properties.findOne({ userID: req.session.userID })
        .then((result) => {
            // console.log("in get room result" + result);
            if (result) {
                const house = result.houses.find(house => house._id == req.params.id)
                // console.log("in get result room found" + house)
                res.json(house)
            }
        }
        )
        .catch((err) => {
            console.log(err)
        }
        )
});

router.post('/houses/:id', (req, res) => {
    console.log(req.session.userID, "in put", req.params.id, "body", req.body)
    properties.findOneAndUpdate({ userID: req.session.userID, "houses._id": req.params.id }, {
        $set: {
            "houses.$.house_name": req.body.house_name,
            "houses.$.tenant_type": req.body.tenant_type,
            "houses.$.rent": req.body.rent,
            "houses.$.capacity": req.body.capacity

        }
    }).then((result) => {
        console.log(result, "in put")
        res.send("Done Updating")
    }).catch((err) => {
        console.log(err)
    })


    //WHY ISN'T THIS WORKING??????
    // properties.findOneAndUpdate(
    //     { userID: req.session.UserID },
    //     {
    //         $set: {
    //             "houses.$[elem].house_name": req.body.house_name,
    //             "houses.$[elem].tenant_type": req.body.tenant_type,
    //             "houses.$[elem].rent": req.body.rent,
    //             "houses.$[elem].capacity": req.body.capacity

    //         }
    //     },
    //     {
    //         arrayFilters: [{ "elem._id": req.params.id }],
    //     }
    // ).then((result) => {
    //     console.log(result, "in put update")
    //     res.send("Done Updating")
    // }).catch((err) => {
    //     console.log(err)
    // });

});

router.put('/houses/:id/delete', (req, res) => {
    console.log(req.body, "in put houses");
    properties.findOneAndUpdate({ userID: req.session.userID },
        {
            $pull: { houses: { _id: req.params.id } }
        }).then((result) => {
            console.log(result, "in put")
            res.send("Done Updating")
        }).catch((err) => {
            console.log(err)
        })
}
);


module.exports = router;