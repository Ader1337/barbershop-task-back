let mongoose = require('mongoose'),
    Barber = mongoose.model('Barber');


exports.getBarbers = async function (req, res, next) {
    try {
        const data = await Barber.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
   
};