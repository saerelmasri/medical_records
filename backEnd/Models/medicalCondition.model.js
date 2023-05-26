const mongoose = require('mongoose')

const medicalConditionSchema = mongoose.Schema({
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

const MedicalCondition = mongoose.model('MedicalCondition', medicalConditionSchema)
module.exports = MedicalCondition