let mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    User = mongoose.model('User');

exports.register = async function (req, res) {
    await User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ message: 'Such user already exists' });
        }
        else{
            let newUser = new User(req.body);
            newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
            newUser.save().then(function (models) {
                models.hash_password = undefined;
                res.setHeader('Content-Type', 'application/json')
                return res.json({ token: jwt.sign({ email: models.email, _id: models._id }, 'RESTFULAPIs') });
            }).catch(function (err) {
                return res.status(400).send({
                    message: err
                });
            });
        }
    })
};



exports.sign_in = async function (req, res) {
    User.findOne({
        email: req.body.email
    }).then(function (models) {
        if (!models || !models.comparePassword(req.body.password)) {
            return res.status(400).json({ message: 'Authentication failed. Invalid user or password.' });
        }
        return res.json({ token: jwt.sign({ email: models.email, _id: models._id }, 'RESTFULAPIs') });
    }).catch(function (err) {
        throw err
    });
};

exports.loginRequired = function (req, res, next) {
    console.log(req.header('authorization'))
    if (req.header('authorization')) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!!' });
    }
};
exports.profile = function (req, res, next) {
    const decode = jwt.verify(req.header('authorization'), 'RESTFULAPIs');
    if (decode) {
        next();
    }
    else {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.getUser = function (req, res, next) {
    const decode = jwt.verify(req.header('authorization'), 'RESTFULAPIs');
    if (decode) {
        return res.json(decode);
    }
    else {
        return res.status(401).json({ message: 'Something went wrong' });
    }
};