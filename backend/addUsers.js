const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User"); // adjust path if needed

mongoose
  .connect("mongodb://testpavan:Pava&n5Y5&7AdAv@217.145.69.24:27017/crm")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function createUsers() {
  const users = [
    {
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      email: "client@example.com",
      password: "client123",
      role: "client",
    },
    {
      email: "user@example.com",
      password: "user123",
      role: "user",
    },
  ];

  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 10);
    await User.create({ email: u.email, password: hashedPassword, role: u.role });
    console.log(`${u.role} created: ${u.email}`);
  }

  mongoose.disconnect();
}

createUsers();
