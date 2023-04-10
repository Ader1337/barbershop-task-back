let mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let RecordSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    fullDate: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    barberId: {
        type: String,
        required: true
    },
    formattedDate: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    barberName: {
        type: String,
        required: true
    }
});

mongoose.model('Record', RecordSchema);