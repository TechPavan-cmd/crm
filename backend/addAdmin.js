const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

mongoose.connect("mongodb://testpavan:Pava%26n5Y5%267AdAv@217.145.69.24:27017/crm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdminUser = async () => {
  try {
    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("⚠️ Admin user already exists.");
      mongoose.disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash("123456", 10);
    const newUser = new User({
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();
    console.log("✅ Admin user created.");
  } catch (error) {
    console.error("❌ Error creating user:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

createAdminUser();
