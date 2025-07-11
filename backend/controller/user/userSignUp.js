const userModel = require("../../models/userModel")
const bcrypt = require('bcrypt');

async function userSignUpController(req, res){
    try{
        const {email, password, name} = req.body

        const user = await userModel.findOne({email})

        if(user){
            throw new Error("User already exists.")
        }

        if(!email){
            throw new Error("Please Provide email")
        }
        if(!password){
            throw new Error("Please Provide password")
        }
        if(!name){
            throw new Error("Please Provide name")
        }

        
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err){
                    console.log(err)
                }
                const payload = {
                    ...req.body,
                    role : "GENERAL",
                    password : hash
                }
                
                
                const userData = new userModel(payload)
                const saveUser = await userData.save()
                

                
        
                res.status(201).json({
                    data : saveUser,
                    success : true,
                    error: false,
                    message : "User created successfully"
                })
            });
        });


    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}


module.exports = userSignUpController