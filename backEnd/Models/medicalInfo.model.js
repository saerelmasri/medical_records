const mongoose = require('mongoose')

const medicalSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        require: true,
    },
    medical_conditions: {
        type: String,
        require: true,
    },
    allergic: {
        type: String,
        require: true
    },
    medications: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const MedicalInfo = mongoose.model('MedicalInfo', medicalSchema)
module.exports = MedicalInfo