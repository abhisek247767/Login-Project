const authService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const result = await authService.signup(username, email, password);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
    res.json({ message: "Logout successful" });
  };
  