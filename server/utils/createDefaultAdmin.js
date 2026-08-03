const User = require("../models/User");
const bcrypt = require("bcrypt");

const createDefaultAdmin = async () => {
  try {
    const admin = await User.findOne({ role: "Admin" });

    if (admin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "Mayank",
      email: "admin@crm.com",
      password: hashedPassword,
      role: "Admin",
      status: "Active",
    });

    console.log("✅ Default Admin Created");
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
};

module.exports = createDefaultAdmin;