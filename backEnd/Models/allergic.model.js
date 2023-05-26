const mongoose = require('mongoose')

const allergicSchema = mongoose.Schema({
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

const Allergic = mongoose.model('Allergic', allergicSchema)
module.exports = Allergic