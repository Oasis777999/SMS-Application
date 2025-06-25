const router = require("express").Router();
const User = require("../models/userModel");

// /Add new user 
router.post("/register", async (req, res) => {
  try {
    const { userName } = req.body;
    const existingUser = await User.findOne({ userName });

    console.log(userName);

    if (!existingUser) {
      const user = new User(req.body);
      const savedUser = await user.save();
      res.status(201).json({ success: true, data: savedUser });
    } else {
      res
        .status(200)
        .json({ success: false, message: "User is already registerd" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user data
router.put("/update/:userName", async (req, res) => {
  try {
    const { userName } = req.params;

    // Find and update the user
    const updateUser = await User.findOneAndUpdate(
      { userName },
      req.body,
      { new: true } //return the updated document
    );
    if (!updateUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: updateUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete the user
router.delete("/delete/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const deleteUser = await User.findOneAndDelete({ userName });

    if (!deleteUser) {
      return res
        .status(404)
        .json({ success: false, message: `${userName} Not found` });
    }

    res
      .status(200)
      .json({
        success: true,
        message: `User ${userName} deleted successfully`,
        data: deleteUser,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
