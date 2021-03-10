
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    price : {
        type: Number,
        default:0
    },
    category1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category1',
        required:true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

//create a virtual id to use in other parts of the application.
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSchema. set ('toJSON', {
    virtuals: true,
});

exports.Product = mongoose.model('products', productSchema);