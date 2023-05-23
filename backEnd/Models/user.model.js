const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    full_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: 'Please enter a valid email address'
        },
       
    },
    password: {
        type: String,
        require: true,
        minlenght: 8,
        maxlenght: 32,
        validate: {
            validator: function(v) {
              return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,32}$/.test(v);
            },
            message: 'Password must be at least 8 characters, and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        }
    },
    userType: {
        type: Number,
        require: true
    }
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('Users', userSchema)
module.exports = User