const  {Category1} = require('../model/category1');

const express = require('express');

const router = express.Router();



router.post('/', async (req, res) => {
    const category = new Category1({
        name: req.body.name,
        icon: req.body.icon,
        colour: req.body.colour,
    })

    getCategory = await category.save();

    if(!getCategory){
        res.status(500).send('Error');
    } else{
        res.send(getCategory);
    }
});


router.get(`/`, async (req, res) => { //this gets all the categories in the database
    const categoryList = await Category1.find();

    if(!categoryList){
        res.status(500).json({success: false})
    }
    res.send(categoryList);
});


router.delete('/:categoryId', (req, res) => {
    Category1.findByIdAndRemove(req.params.categoryId).then(category => {
        if(category){
            return res.status(200).json({success: true, message: 'the category is removed'})
        }else{
            return res.status(404).json({success:false, message: 'category not found'})
        } //Us catch to send any server related error
    }).catch(err => {
        return res.status(400).json({success: false, error: err})
    })
})


router.get('/:categoryId', async(req, res) => {
    const category = await Category1.findById(req.params.categoryId);
    if (!category){
        res.status(500).json({message: 'the category with the given ID was not found'})
    } else{
        res.status(200).send(category);
    }
})


router.put('/:categoryId', async (req, res) => { //Update a record
    const category = await Category1.findByIdAndUpdate(
        req.params.categoryId,
        {
        name: req.body.name,
        icon: req.body.icon,
        colour: req.body.colour,
    }, {new:true,useFindAndModify: false}); //this is the return the new update record in postman

    if (!category)
    return res.status(400).send('Error! The category cannot be created!');

    res.send(category);

    })









module.exports = router;