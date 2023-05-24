const { json } = require('body-parser');
const User = require('../Models/user.model');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try{
        const { fullName, email, password, type} = req.body;
        const checkUser = await User.findOne({email});

        if(checkUser){
            return res.status(409).json({
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

        return res.status(201).json({
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

const login = async(req, res) => {
    try{
        const { email, password } = req.body;
        const findUser = await User.findOne({email});

        if(!findUser){
            return res.status(404).json({
                status: 404,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await findUser.matchPassword(password)
        if(!isMatch){
            return res.status(404).json({
                status: 404,
                message: 'Invalid credentials'
            }); 
        }

        const token = jwt.sign({
            id: findUser._id,
            name: findUser.full_name,
            email: findUser.email,
            type: findUser.userType
        }, process.env.JWT_KEY);

        return res.status(201).json({
            status: 201,
            message: token
        })
    }catch(err){
        res.status(500).json({
            status: 500,
            message: err
        })
    }
}

module.exports = {
    register,
    login
}