import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcryptjs";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ message: "Missing Data" });
        }

        const userExit =await User.findOne({ email });

        if (userExit) {
            return res.status(400).json({ message: "User already Exist" })
        }

        const salt = await bcrypt.genSalt(10);// saltRound=10;
        const hashpassword = await bcrypt.hash(password, salt);

        const newUser=await User.create({
            name,
            email,
            password: hashpassword
        }
        );

        const token =jwt.sign({id:newUser._id,name:newUser.name},process.env.JWT_SECRET,{expiresIn:"1d"});

        return res.status(200).json({ message: "User created Successfully" ,token});
    }
    catch (error) {
        return res.status(500).json({ errormessage: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "Missing Data" });
        }
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invlid Credential!!!" });
        }

        // Compare password with hashed password in DB

        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invlid Credential!!!" });
        }

        //Generate token
        const token = jwt.sign({ id: userExist._id, email: userExist.email }, process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login Successfully",
            token
        }
        );

    } catch (error) {
        return res.status(500).json({ errormessage: error.message });
    }
}

export const getCurrent =async(req,res)=>{
    const data = req.user;
    // console.log("data ",data);
    res.status(200).json({user: data});
}