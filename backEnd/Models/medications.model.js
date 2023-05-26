const mongoose = require('mongoose')

const medicationSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true,
    },
    record: {
        type: String,
        require: true,
    }
})

const Medications = mongoose.model('Medications', medicationSchema)
module.exports = Medications