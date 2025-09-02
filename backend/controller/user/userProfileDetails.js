const userModel = require("../../models/userModel")

async function userProfileDetails(req, res){
    try {
        const userId = req.userId; // from JWT
        const user = await userModel.findById(userId).select("-password"); // exclude password

        if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User Profile Details"
        })
    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = userProfileDetails