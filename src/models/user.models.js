import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lower: true,
    index: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    lower: true,
    index: true,
    unique: true
  },
  fullname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
}); 

// password hashing or encrypting
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

// compare password function
userSchema.methods.comparePassword = function (pass) {
  return bcrypt.compareSync(pass, this.password);
}

// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    process.env.ACCESS_SECRET_KEY,
    {
      algorithm: "HS256",
      expiresIn: "4h"
    }
  )
}

const User = mongoose.model("User", userSchema);

export { User }