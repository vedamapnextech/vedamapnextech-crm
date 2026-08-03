const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const transporter = require("../config/mail");
const crypto = require("crypto");


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }

        if (user.status !== "Active") {
            return res.status(403).json({
                success: false,
                message: "Your account is inactive",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }




        user.lastLogin = new Date();


        console.log("========== LOGIN ==========");
        console.log("Logged In User:", user.email);
        console.log("User ID:", user._id.toString());









        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                profileImage: user.profileImage,
            },
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

const getProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const updateProfile = async (req, res) => {
    try {

        const { name, phone } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.name = name || user.name;
        user.phone = phone || user.phone;

        if (req.file) {

            // Purani image delete karo
            if (user.profileImage) {

                const oldImagePath = path.join(__dirname, "..", user.profileImage);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            user.profileImage = `/uploads/users/${req.file.filename}`;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};


const changePassword = async (req, res) => {
    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findById(req.user._id);

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current Password is incorrect",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};








const sendEmailOtp = async (req, res) => {
    try {

        const { newEmail, password } = req.body;

        if (!newEmail || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findById(req.user._id);

       
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        const existingUser = await User.findOne({
            email: newEmail.toLowerCase(),
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.pendingEmail = newEmail.toLowerCase();
        user.emailOtp = otp;
        user.emailOtpExpire = Date.now() + 10 * 60 * 1000;

        await user.save();
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "JobTrack CRM - Email Verification OTP",
            html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
            <h2>Email Verification</h2>

            <p>Hello <b>${user.name}</b>,</p>

          <p>You requested to change your email address.</p>

             <p>
      New Email:
         <b>${newEmail}</b>
    </p>

       <p>Your verification OTP is:</p>

            <h1 style="letter-spacing:5px;color:#2563eb;">
                ${otp}
            </h1>

            <p>This OTP will expire in <b>10 minutes</b>.</p>

            <p>If you didn't request this change, please ignore this email.</p>

            <br>

            <small>JobTrack CRM Team</small>
        </div>
    `,
        });
     
        return res.status(200).json({
            success: true,
            message: "OTP generated successfully",

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }

};






const verifyEmailOtp = async (req, res) => {
    try {

        const { otp } = req.body;

        if (!otp) {
            return res.status(400).json({
                success: false,
                message: "OTP is required",
            });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!user.emailOtp || !user.pendingEmail) {
            return res.status(400).json({
                success: false,
                message: "No OTP request found",
            });
        }

        if (user.emailOtpExpire < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        if (user.emailOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        user.email = user.pendingEmail;

        user.pendingEmail = null;
        user.emailOtp = null;
        user.emailOtpExpire = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email changed successfully",
            user,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

const testEmail = async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: "JobTrack CRM - Test Email",
            html: `
                <h2>Congratulations 🎉</h2>
                <p>Email configuration is working.</p>
            `,
        });

        return res.status(200).json({
            success: true,
            message: "Email Sent Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Email Sending Failed",
        });

    }
};

const forgotPassword = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset Your Password - JobTrack CRM",
            html: `
        <div style="font-family:Arial;padding:20px">
            <h2>Reset Password</h2>

            <p>Hello <b>${user.name}</b>,</p>

            <p>You requested to reset your password.</p>

            <p>
                <a
                    href="${resetUrl}"
                    style="
                        background:#2563eb;
                        color:#fff;
                        padding:12px 20px;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Reset Password
                </a>
            </p>

            <p>This link will expire in <b>15 minutes</b>.</p>

            <p>If you didn't request this, simply ignore this email.</p>

            <br>

            <small>JobTrack CRM Team</small>
        </div>
    `,
        });

        return res.status(200).json({
            success: true,
            message: "Password Reset Link Sent Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

const resetPassword = async (req, res) => {
    try {

        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or Expired Token",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpire = null;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password Reset Successfully",
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};

module.exports = {
    login,
    getProfile,
    updateProfile,
    changePassword,
    sendEmailOtp,
    testEmail,
    verifyEmailOtp,
    forgotPassword,
    resetPassword,
};