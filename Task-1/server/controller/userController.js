const user = require("../model/userModel.js");

exports.create = async (req,res) =>{
        try { 
            console.log("creating")
            console.log(req.body);
            const newUser = new user(req.body);
            const {email} = newUser;

            const userExists = await user.findOne({email});
            if(userExists){
                return res.status(400).json({message : "User already exists"})
            }
            const savedData = await newUser.save();
            res.status(200).json(savedData);
        } catch (error) {
            res.status(500).json({errorMessage : error.message})
        }
};

exports.getAllUsers = async (req,res) =>{
        try {
            const userData = await user.find();
            if(!userData || userData.length === 0){
                return res.status(404).json({message : "No users found"});
            }
            res.status(200).json(userData);
        } catch (error) {
                res.status(500).json({errorMessage : error.message})
        }
};

exports.getUserById = async (req,res) => {
        try {
            const id = req.params.id;
            console.log("paramters: ", req.params);
            const userExist = await user.findById(id);
            if(!userExist){
                return res.status(404).json({message : "User not found"})
            }
            res.status(200).json(userExist);

        } catch (error) {
                res.status(500).json({errorMessage : error.message})
        }
};

exports.update = async (req,res) => {
        try{
            const id = req.params.id;
            const userExist = await user.findById(id);
            if(!userExist){
                return res.status(404).json({message : "User not found"})
            }
            const updateData = await user.findByIdAndUpdate(id, req.body, {
                new : true
            });
            res.status(200).json({message : "User updated successfully"})
        } catch(error){

        }
};

exports.deleteUser = async (req,res) => {
        try {
            const id = req.params.id;
            const userExist = await user.findById(id);
            if(!userExist){
                return res.status(404).json({message : "User not found"})
            }
            await user.findByIdAndDelete(id);
            res.status(200).json({message : "User deleted successfully"})
} catch (error){
    res.status(500).json({errorMessage : error.message});
}
};

