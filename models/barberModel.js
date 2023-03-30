let mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let BarberSchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    photoImg: {
        type: String,
        required: true
    }
});

mongoose.model('Barber', BarberSchema);