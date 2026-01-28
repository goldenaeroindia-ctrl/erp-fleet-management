const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["ADMIN", "MANAGER"].includes(role)) {
      return res.status(400).json({ message: "Role must be ADMIN or MANAGER" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password, role });
    return res
      .status(201)
      .json({ message: `${role} created`, user: { id: user._id, name, email, role } });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create user", error: error.message });
  }
};

exports.listUsers = async (_req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  const formatted = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  }));
  return res.status(200).json({ users: formatted });
};


