const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });

    if (user) {
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        // Passwords match
        // Store user session (implementation not provided)
        req.session.userId = user._id
        return res.redirect('/');
      } else {
        return res.redirect('/auth/login');
      }
    } else {
      return res.redirect('/auth/login');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
