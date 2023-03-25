const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/userModel')
const bodyParser = require('body-parser')
const jsonwebtoken = require("jsonwebtoken")

require('dotenv').config({ path: "environment.env" });

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString);
const database = mongoose.connection



/* database.once('connected', () => {
    console.log('Database Connected');
}) */

let app = express();

const cors = require('cors');
app.use(cors({
    origin: "*"
}));
/* app.use(express.json());
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)

    app.use(function (req, res, next) {
        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
            jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
                if (err) req.user = undefined;
                req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    });
})


let routes = require('./routes/userRoute');

routes(app);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});





/* database.on('error', (error) => {
    console.log(error)
}) */


/* app.use('/api', routes) */


