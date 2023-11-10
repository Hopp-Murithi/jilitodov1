const express = require("express");

const {
    registerUser,
    loginUser,
    logOutUser
} = require("../controllers/auth/register.controller");
const {
    payloadValidationErrors,
} = require("../helpers/payloadValidationErrors.helper");
const {authValidations} = require("../validations/auth.validations");

const auth = express.Router();

const authBaseUrl = "/auth/user";

/**
 * Register user route
 * */
auth.post(
    authBaseUrl + "/register",
    authValidations["registration"],
    payloadValidationErrors,
    registerUser,
);
/**
 * Login user route
 * */
auth.post(
    authBaseUrl + "/login",
    authValidations["login"],
    payloadValidationErrors,
    loginUser
)

/**
 * logout user
 * */
auth.post(
    authBaseUrl + "/logout",
    logOutUser
)

module.exports = {auth};