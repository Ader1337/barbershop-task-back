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

/* exports.updateBarber = async function (req, res, next) {
    try {
        console.log(req.body)
        let myquery = { _id: req.body.id };
        let newvalues = { $set: { name: req.body.newName } };
        await Barber.updateOne(myquery, newvalues)
        res.status(200).send()
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

};
 */

