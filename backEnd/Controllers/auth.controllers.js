const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try{
        const { fullName, email, password, type} = req.body;
        const checkUser = await User.findOne({email});

        if(checkUser){
            res.status(409).json({
                status: 409,
                message: 'User already exist'
            })
        }

        const user = new User();
        user.full_name = fullName;
        user.email = email;
        user.password = password;
        user.userType = type;
        await user.save();

        const token = jwt.sign({
            id: user._id,
            fullName: user.full_name,
            email: user.email
        }, process.env.JWT_KEY);

        res.status(201).json({
            status: 201,
            message: token
        })

    }catch(err){
        res.status(500).json({
            status: 500,
            message: err
        });
    }
}

// const login = (req, res) => {

// }

// const getUserByToken = (req, res) => {

// }

module.exports = {
    register
}