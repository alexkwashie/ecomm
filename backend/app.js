
const express = require('express');
const app = express();
const cors = require('cors');
//Middleware to show JSON
const bodyParser = require('body-parser');

//Log Http calls
const morgan = require('morgan');
app.use(morgan('tiny'));

//Mongo database set up
const mongoose = require('mongoose');

//Utilities
app.use(bodyParser.json());
require('dotenv/config');
const api = process.env.API_URL;
app.use(cors());
app.options('*', cors());


//Routes
const productRoute = require('./routers/rProduct');
const categoryRoute1 = require('./routers/rCategory1');
const userRoute = require('./routers/rUser');
const OrderRoute = require('./routers/rOrder');

app.use(`${api}/products`, productRoute); // `${api}/products` is used in the Post and get calls in rProduct.js
app.use(`${api}/category1`, categoryRoute1);
app.use(`${api}/user`, userRoute);



//Database Connections
mongoose.connect(process.env.DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Database Connection is ready...')
})
.catch((err) => {
    console.log(err)
});



app.listen(3000, () => {
console.log(api);
    console.log('Server is running on port 3000');
});