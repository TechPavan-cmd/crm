const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path if needed

mongoose.connect('mongodb://testpavan:Pava&n5Y5&7AdAv@217.145.69.24:27017/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
  seedUsers();
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

async function seedUsers() {
  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'client@example.com', password: 'client123', role: 'client' },
    { email: 'user@example.com', password: 'user123', role: 'user' },
  ];

  for (const user of users) {
    const existing = await User.findOne({ email: user.email });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({ email: user.email, password: hashedPassword, role: user.role });
      console.log(`Created user: ${user.email}`);
    } else {
      console.log(`User already exists: ${user.email}`);
    }
  }

  mongoose.connection.close();
}
