const mongoose = require('mongoose');
// email unique

const userSchema = mongoose.Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('Book', userSchema);
