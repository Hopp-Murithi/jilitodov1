const express = require("express");

const { registerUser } = require("../controllers/auth/register.controller");
const {
  payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");
const { authValidations } = require("../validations/auth.validations");

const auth = express.Router();

const authBaseUrl = "/auth/user";

auth.post(
  authBaseUrl + "/register",
  authValidations["registration"],
  payloadValidationErrors,
  registerUser,
);

module.exports = { auth };