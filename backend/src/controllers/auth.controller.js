const authService = require('../services/auth.service');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
    const token = await authService.login(username, password);
    if (!token) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
