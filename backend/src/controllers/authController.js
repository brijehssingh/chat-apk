
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../lib/utils.js";
import jwt from "jsonwebtoken"
import cloudinary from "../lib/cloudinary.js";
import {connectDB} from "../lib/db.js"


export const signup = async (req, res) => {



  const { fullName, email, password, profilePic } = req.body;


  if(!fullName||!email||!password) return res.json({message:"All fiels require"})

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    const user = await newUser.save();

    if (user) {
      generateToken(user._id, res);
      res.status(201).json(user);
    } else {
      res.status(500).json({ message: "There was a problem creating the user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(401).json({ message: "Invalid credentials" });

    const verifyPassword = await bcrypt.compare(password, existingUser.password);

    if (!verifyPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    generateToken(existingUser._id, res); // Use _id to match protectRoute

    const userData = {
      _id: existingUser._id,
      email: existingUser.email,
      fullName: existingUser.fullName,
      profilePic: existingUser.profilePic,
    };

    res.status(200).json(userData);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req,res)=>{

try {
  res.cookie("jwt","")  ;
  res.json({message:"log out successfull"})
} catch (error) {
    req.json({message:error.message});
}

};

export const update = async(req ,res)=>{

try {
    
const {profilePic , fullName} = req.body; 
 
 const userId = req.user._id;
  
const uploadResponse = await cloudinary.uploader.upload(profilePic);

const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},
    {new:true}
);
res.json({message:updateUser});

} catch (error) {
    res.json({message:error.message});

}

};

export const check=(req,res,next)=>{
 
    try {
        res.json(req.user); 

    } catch (error) {
        res.json(error.message); 

    }

}



