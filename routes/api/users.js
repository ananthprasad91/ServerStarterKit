const express = require('express')
const router = express.Router()

const Users = require('../../models/Users')

//Get Single User For Login Check
router.get('/:username', (req, res) => {
    Users.findOne({ "username": req.params.username })
            .then((data)=> res.json(data))
})

//Create Users
router.post('/', (req, res) => {
    const newUser = new Users({
        username: req.body.username,
        password: req.body.password,
        type: req.body.type
    })

    newUser.save()
        .then( user => res.json(user))
        .catch((err)=> res.status(404).res.json(err))
})
//Update Users
router.put('/:id', (req, res) =>{
    Users.findOne({ "_id": req.params.id }, function (err, doc){
        doc.name = req.body.name
        doc.number = req.body.number
        doc.save()
            .then(()=> res.json({success: true}))
            .catch((err)=> res.status(404).res.json({success: false}))
      });
})
//Delete Users
router.delete('/:id', (req,res) => {
    Users.findById(req.params.id)
        .then(doc => doc.remove().then( ()=> res.json({success: true})) )
        .catch(err => res.status(404).json({success: false}))
})

module.exports = router