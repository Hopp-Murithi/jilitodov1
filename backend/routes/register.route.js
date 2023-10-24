const express = require("express");
const { check } = require("express-validator");

const { registerUser } = require("../controllers/auth/register.controller");

const auth = express.Router();

/**
 * configure route path
 */
const authBaseUrl = "/auth/user";

/**
 * create post route to register user and validate there is input
 */

auth.post(
  authBaseUrl + "/register",
  registerUser
);

module.exports = { auth };
