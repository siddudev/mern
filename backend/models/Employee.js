const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  empId: { type: String, required: true },
  favTools: { type: [String], required: true },
  password: { type: String, required: true }
});

// Pre-save middleware to hash the password before saving
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
