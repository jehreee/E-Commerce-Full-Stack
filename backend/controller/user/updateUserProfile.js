const userModel = require("../../models/userModel")

async function updateUserProfile(req, res){
    try {
    const userId = req.userId;
    const { name, email, profilePic } = req.body;

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { name, email, profilePic },
      { new: true }
    );

    if (!updatedUser) {
      return res.json({ success: false, error: true, message: "User not found" });
    }

    res.json({ 
        success: true,
        error: false,
        message: "Profile updated", 
        data: updatedUser 
        });
  } catch (err) {
    res.json({ 
        success: false, 
        error: true, 
        message: err.message 
    });
  }
}


module.exports = updateUserProfile