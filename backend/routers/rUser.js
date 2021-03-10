const {User} = require('../model/user');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Get Request
router.get(`/`, async (req, res) => {
    const UserList = await User.find().select('-passwordHash');

    if(!UserList){
        res.status(500).json({success: false})
    }
    res.send(UserList);
})


//User post request
router.post(`/`, async (req, res) => {

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        street: req.body.street,
        city: req.body.city,
        phone: req.body.phone,
        country: req.body.country,
        isAdmin: req.body.isAdmin,
    });

    
    user = await user.save();

    if (!user)
    return res.status(500).send('New user could not be created');

    res.send(user);

});


//Get Single user by ID
router.get('/:userId', async(req, res) => {
    const user = await User.findById(req.params.userId).select('-passwordHash'); //this is to exclude the PasswordHash
    if (!user){
        res.status(500).json({message: 'Invalid user Id'})
    } else{

        res.status(200).send(user);
    }
});


//Get the amount of users (count)
router.get('/get/count', async(req, res) => {
    const userCount = await User.countDocuments(count => count);

    if (!userCount){
        res.status(500).json({success: false})
    } else{

        res.send({
            count : userCount
        });
    }
});


//Delete Product
router.delete('/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId).then(product => {
        if(product){
            return res.status(200).json({success: true, message: 'the product is removed'})
        }else{
            return res.status(404).json({success:false, message: 'category not found'})
        } //Us catch to send any server related error
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
});


//Set up user login
router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email}) //find one by email

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){ 
        res.status(200).send('user Authenticated')
    } 
    else {
        res.status(400).send('password is wrong!')
    }

})



module.exports = router;