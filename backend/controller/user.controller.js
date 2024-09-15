const bcrypt = require("bcryptjs");
const User = require("../model/user.model");
const { generateTokenAndSetCookie } = require("../utils/generateToken");

const signup = async(req, res) => {
    try{
        const {name, username, password, confirmPassword} = req.body;

        console.log('data', name, username, password, confirmPassword)

        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password doesn't match"});
        }

        const user = await User.findOne({username});

        // username already exists
        if(user){
            return res.status(400).json({error: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            username,
            password: hashPassword
        })

        if(newUser){
            generateTokenAndSetCookie(newUser._id, res)

            await newUser.save();

            res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                username: newUser.username
            })
        }
        else {
            res.status(400).json({ error: "Invalid user data" })
        }
    }
    catch(err){
        console.log('err in signup user');
        res.status(500).json({ error: "internal server error" });
    }
}


const login = async(req,res) => {
    try{
        const {username, password} = req.body;

        console.log('username', username, password);

        const user = await User.findOne({username});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name:  user.name,
            username: user.username
        })

    }
    catch(err){
        console.log('err in login user');
        res.status(500).json({ error: "internal server error" });
    }
}



module.exports = {signup, login}