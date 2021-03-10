
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true
},
passwordHash: {
    type: String,
    default: ''
},
street : {
  type: String,
  default: ''
},
city: {
  type: String,
  default: ''
},
phone: {
    type: Number,
    default: ''
},
country: {
  type: String,
  default: '',
},
dateCreated: {
    type: Date,
    default: Date.now,
},
isAdmin: {
  type: Boolean,
  default: false,
}
})

//create a virtual id to use in other parts of the application.
userSchema.virtual('id').get(function () {
return this._id.toHexString();
});

userSchema. set ('toJSON', {
virtuals: true,
});

exports.User = mongoose.model('user', userSchema);
exports.userSchema = userSchema;