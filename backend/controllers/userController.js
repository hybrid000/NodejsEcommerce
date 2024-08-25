const passport = require('passport');
const User = require('../models/user.js');
const bcrypt = require('bcrypt');


const registerFunction = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: { confirmPassword: "Passwords do not match" } });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: { email: "Email already exists" } });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        req.login(newUser, (err) => {
            if (err) {
                console.error("Error during login:", err);
                return res.status(500).json({ error: { login: "An error occurred during login." } });
            }
            return res.status(200).json({ success: true });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ error: { unexpected: "An unexpected error occurred" } });
    }
};


const loginFunction = (req, res, next) => {

    passport.authenticate('custom-local', (err, user, info) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        req.login(user, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Login failed' });
            }
            return res.json({ success: true, redirect: '/' });
        });
    })(req, res, next);
};



const logoutFunction = (req, res, next) => {

    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
};


const userProfile = (req, res) => {

    // Send JSON response with user data
    res.json({
        username: req.user.username,
    });
}
const changeUsername = async (req, res) => {
    try {
        const userId = req.user._id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { username: req.body.username },
            { new: true } // This returns the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Username updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating username", error: error.message });
    }
};



const changePassword = async (req, res) => {
    try {
        // Get the user from the request
        const userId = req.user._id;
        const { currentPassword, newPassword, confirmNewPassword } = req.body;

        // Check if the new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ error: { confirmNewPassword: "New passwords do not match" } });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare current password with the stored hashed password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: { currentPassword: "Current password is incorrect" } });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Error updating password", error: error.message });
    }
};


module.exports = { registerFunction, loginFunction, logoutFunction, userProfile, changeUsername, changePassword};
