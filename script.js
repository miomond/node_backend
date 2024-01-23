//index.js

const {json} = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
let f = require('fs');
const mongoose = require('mongoose');
const userRoute = require('./routes/UserRoute')
const BlogRoutes = require('./routes/BlogRoute');
main().catch(err => console.log(err));
async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/twiter');
}





app.use(express.json());
app.use(express.urlencoded({  extended: true}));



app.post('/register', userRoute);
app.post('/login', userRoute);

app.use('/blogs', BlogRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
