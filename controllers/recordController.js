let mongoose = require('mongoose'),
    Record = mongoose.model('Record'),
    Barber = mongoose.model('Barber');


let workingTimes = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

exports.addRecord = async function (req, res) {
    let newRecord = new Record({ ...req.body, userId: res.user._id });
    newRecord.save().then(function (models) {
        return res.status(200).send()
    }).catch(function (err) {
        return res.status(400).send({
            message: err
        });
    });
};

exports.deleteRecord = async function (req, res) {
    try {
        await Record.deleteOne({
            _id: req.query._id
        });
        res.send()

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getAvailableTime = async function (req, res) {
    try {
        const data = await Record.find({
            formattedDate: req.query.formattedDate,
            barberId: req.query.barberId
        });
        let availableTimes = []

        console.log(data)
        workingTimes.forEach((time) => {
            let isBusyTime = false
            data.forEach((record) => {
                if (time == record.time)
                    isBusyTime = true
            })
            if (!isBusyTime)
                availableTimes.push(time)
        })
        /*  data.forEach((record) => {
             let index = workingTimes.indexOf(record.time)
 
             if (index !== -1)
                 availableTimes.splice(index, 1)
         }) */

        res.status(200).json({ availableTimes: availableTimes })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

exports.getRecords = async function (req, res) {
    try {
        let data
        if (req.query.barberId)
            data = await Record.find({ barberId: req.query.barberId });
        else
            data = await Record.find();
        data.sort(function (a, b) {
            return new Date(b.fullDate) - new Date(a.fullDate);
        });
        res.status(200).json(data)

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};



exports.getUserRecord = async function (req, res) {
    try {
        const data = await Record.find({
            date: {
                $gte: new Date(req.query.from),
                $lt: new Date(req.query.to)
            },
            userId: res.user._id
        });
        if (data[data.length - 1]) {
            const barber = await Barber.findOne({ _id: data[data.length - 1].barberId })
            res.json({ record: data[data.length - 1], barber: barber })
        } else {
            res.send()
        }

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

