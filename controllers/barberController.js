let mongoose = require('mongoose'),
    Barber = mongoose.model('Barber'),
    Record = mongoose.model('Record'),
    BestBarber = mongoose.model('BestBarber')

exports.getBarbers = async function (req, res, next) {
    try {
/*         Barber.aggregate([{
            "$lookup": {
                from: "bestbarbers",
                localField: "name",
                foreignField: "name",
                as: "bestBarberName"
            },
        }, {
            "$match": {
                "bestBarberName": {
                    $size: 1
                }
            }
        }]).then((result) => {
            if (result) {
                res.json(result)
                console.log(result)
            }
        }); */
        /*   db.Barber.aggregate() */
        /*  const data = await Barber.find(); */
        /*  res.json(data) */
        const data = await Barber.find() 
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

