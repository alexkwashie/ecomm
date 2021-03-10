const mongoose1 = require('mongoose');

const categorySchema1 = mongoose1.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    colour: {
        type: String,
    }
})


exports.Category1 = mongoose1.model('Category1', categorySchema1);