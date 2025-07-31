const bcrypt = require('bcrypt')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')

async function userSignInController(req, res){
    try{
        const {email, password} = req.body

        if(!email){
            throw new Error("Please Provide email")
        }
        if(!password){
            throw new Error("Please Provide password")
        }

        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }

        await bcrypt.compare(password, user.password, async function(err, result) {
            // result == true
            // if(result){
            //     console.log("result", result)
            // }  
            if(result === true){
                const tokenData = {
                    _id : user._id,
                    email : user.email,
                }
                const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

                // const tokenOption = {
                //     httpOnly : true,
                //     secure : true
                // }

                const tokenOption = {
                    httpOnly : true,
                    secure : process.env.NODE_ENV === 'production',
                    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                    
                }

                res.cookie("token", token, tokenOption).json({
                    message : "Login Successfully",
                    data : token,
                    success : true,
                    error : false
                })
            }else{
                res.json({
                    message : "Check Password",
                    error : true,
                    success : false
                })
            }
            // if(result === false){
            //     console.log("Wrong password")
            // }
        });


    }catch(err){
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}


module.exports = userSignInController