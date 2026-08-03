const express = require("express");

const {
    login,
    getProfile,
    updateProfile,
    changePassword,
    sendEmailOtp,
    forgotPassword,
    testEmail,
    verifyEmailOtp,
    resetPassword,
} = require("../controllers/authController");

const authMiddleware = require("../middlewares/authMiddleware");
const uploadUserPhoto = require("../middlewares/uploadUserPhoto");

const router = express.Router();

router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

router.put(
    "/profile",
    authMiddleware,
    uploadUserPhoto.single("profileImage"),
    updateProfile
);

router.put(
    "/change-password",
    authMiddleware,
    changePassword
);

router.put(
    "/send-email-otp",
    authMiddleware,
    sendEmailOtp
);
router.put(
    "/verify-email-otp",
    authMiddleware,
    verifyEmailOtp
);
router.get("/test-email", testEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;