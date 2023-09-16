
const User = require('../models/User.js')
const path = require('path')


module.exports = async (req, res) => {
    try {
        
      await User.create({ ...req.body });
      res.redirect('/');
    } catch (error) {
      //console.error(error);
      const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
    //   req.session.validationErrors = validationErrors
      req.flash('validationErrors',validationErrors)
      req.flash('data',req.body)
      return res.redirect('/auth/register')
    //   res.status(500).send('Error creating user.');
    }
  };