const mongoose = require('mongoose');

const choreSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

const Chore = mongoose.model('Chore', choreSchema);

module.exports = Chore;