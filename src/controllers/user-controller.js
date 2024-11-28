const { registerUser, getFavorites } = require('../services/user-service');

const register = async (req, res) => {
    try {
      const userData = req.body;
      const user = await registerUser(userData);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

const getFavoritesController = async (req, res) => {
    try {
      const user = req.userId;
      const userFavorites = await getFavorites(user);
      res.status(201).json({ userFavorites });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };



  module.exports = { register, getFavoritesController };