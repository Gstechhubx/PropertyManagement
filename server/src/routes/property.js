const express = require('express');
const router = express.Router();
const properties = require('../models/properties');
const owners = require('../models/owners');
const users = require('../models/users');
const checkAuth = require('../middlewares/checkAuth');
router.post('/addproperty', checkAuth, (req, res) => {
    owners.findOne({ userid: req.session.userid }).then((result) => {
        console.log(result);
        if (result) {
            const newProperty = new properties({
                owner_id: result._id,
                property_name: req.body.property_name,
                address: req.body.address,
                units: []
            })
            newProperty.save().then((result) => {

                owners.updateOne({ userid: req.session.userid }, {
                    $push: {
                        properties: result._id
                    }
                }).then((result) => {

                    res.sendStatus(200)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    })
})

// properties.updateOne({ owner_id: result._id}, {
//     $push: {
//         units: {
//             unit_name: req.body.house_name,
//             monthlyRent: req.body.rent,
//             bedrooms: req.body.bedrooms,
//             bathrooms: req.body.bathrooms,
//             tenant_type: req.body.tenant_type,
//             ispaid: req.body.ispaid,
//         }
//     }
// })

router.get('/properties', (req, res) => {
    console.log(req.session.id)

    owners.findOne({ userid: req.session.userid })
        .then((result) => {
            // const properties = result.properties
            // properties.forEach(property => {
            //     property.units.forEach(unit => {
            //         unit.tenants.forEach(tenant => {
            //             if (tenant.tenant_id == req.session.id) {
            //                 unit.isTenant = true
            //             }
            //         })
            //     })
            // });
            properties.find({ owner_id: result._id }).then((result) => {
                res.json(result)
            }).catch((err) => {
                console.log(err)
            })

            console.log(result, "in get properties")
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

router.post('/houses/:id', checkAuth, (req, res) => {
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

router.put('/houses/:id/delete', checkAuth, (req, res) => {
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