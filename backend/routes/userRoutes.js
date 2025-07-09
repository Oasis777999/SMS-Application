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

// ✅ Update user by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Perform the update
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

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
router.delete("/delete/:id", async (req, res) => {
  try {
    const { userName } = req.params;
    const deleteUser = await User.findOneAndDelete({ userName });

    if (!deleteUser) {
      return res
        .status(404)
        .json({ success: false, message: `${userName} Not found` });
    }

    res.status(200).json({
      success: true,
      message: `User ${userName} deleted successfully`,
      data: deleteUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//User List
router.get("/list", async (req, res) => {
  try {
    const users = await User.find(); // Mongoose model
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err });
  }
});

// Add creadits
router.put("/update/credits/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { credits } = req.body;

    // Add credits to the existing value
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingCredits = parseInt(user.credits) || 0;
    const newCredits = parseInt(credits) || 0;

    user.credits = existingCredits + newCredits;
    const updatedUser = await user.save();

    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/update/password/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Find the user
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update password directly (plain text)
    user.password = password;

    // Save updated user
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
