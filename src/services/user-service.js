// user-service.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const getFavorites = async (user) => {
  console.log('obteniedno favoritos de: ', user);
  const userFound = await User.findOne({ _id: user });

  if(userFound){
    return userFound?.favorites;
  } else {
    return [];
  }
};

const authenticateUser = async (email, id) => {
  const user = await User.findOne({ email, id });
  if (!user) {
    return null;
  }
  return user;
};

module.exports = { registerUser, authenticateUser, getFavorites };