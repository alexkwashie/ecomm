const {Product} = require('../model/product');
const express = require('express');
const { Category1 } = require('../model/category1');
const router = express.Router();
const mongoose = require("mongoose");

router.post(`/`, async (req, res) => {

    const category = await Category1.findById(req.body.category1);
    if(!category) return res.status(400).send('Invalid Category')

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category1: req.body.category1,
        countInStock: req.body.countInStock,
        isFeatured: req.body.isFeatured,
    });

    
    iproduct = await product.save();

    if (!iproduct)
    return res.status(500).send('The product cannot be created');

    res.send(iproduct);

});


//Get Request
router.get(`/`, async (req, res) => {
    // localhost:3000/api/v1/products?category1=2342342,234234
    let filter = {};

    if(req.query.category1){
        filter = {category1: req.query.category1.split(',')}
    }

    const productList = await Product.find(filter).populate('category1');
    //const productList = await Product.find().select('name price -_id'); // get only name and price and remove id
    res.send(productList);
})


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

router.get('/:productId', async(req, res) => {
    const product = await Product.findById(req.params.productId).populate('category1'); //populate: adds all attributes of the category
    if (!product){
        res.status(500).json({message: 'the product with the given ID was not found'})
    } else{

        res.status(200).send(product);
    }
});

router.put('/:productId', async(req, res)=> { //Update a record
    // Validate if Id is correct
    if(!mongoose.isValidObjectId(req.params.productId)){
        return res.status(500).send('Error! Invalid Id');
    }

    const product = await Product.findByIdAndUpdate(
        req.params.productId,
        {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            price: req.body.price,
            category1: req.body.category1,
            countInStock: req.body.countInStock,
            isFeatured: req.body.isFeatured


    }, {new:true,useFindAndModify: false})

    if (!product)
    return res.status(400).send('Error! The category cannot be created!');

    res.send(product);

})


router.delete('/:productId', (req, res) => {
    Product.findByIdAndRemove(req.params.productId).then(prod=> {
        if(prod){
            return res.status(200).json({success: true, message: 'the Product is removed'})
        }else{
            return res.status(404).json({success:false, message: 'This product could not found'})
        } //Us catch to send any server related error
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})


//Get the amount of products count
router.get('/get/count', async(req, res) => {
    const productCount = await Product.countDocuments(count => count);

    if (!productCount){
        res.status(500).json({success: false})
    } else{

        res.send({
            count : productCount
        });
    }
});


//Get product with isfeatured is true
router.get('/get/featured', async(req, res) => {
    const product = await Product.find({isFeatured: true});

    if (!product){
        res.status(500).json({message: 'the product with the given ID was not found'})
    } else{

        res.status(200).send(product);
    }
});


//State and get limited number of featured products i.e. where isfeatured = true
router.get('/get/featured/:count', async(req, res) => {
    const count = req.params.count ? req.params.count : 0
    const product = await Product.find({isFeatured: true}).limit(+count); // the + converts a string to an integer

    if (!product){
        res.status(500).json({message: 'the product count invalid'})
    } else{

        res.status(200).send(product);
    }
});


module.exports = router;