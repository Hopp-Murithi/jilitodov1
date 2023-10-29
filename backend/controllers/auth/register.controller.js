const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { hashPassword, createAuthCookie } = require("../../helpers/auth.helper");

/**
 *
 * @param {*} req request body object
 * @param {*} res response body object
 * @returns success true, false if errored
 */

const registerUser = CatchAsyncErrors(async (req, res, next) => {
  /**
   * destructure user properties
   */
  let { firstName, lastName, email, password} = req.body;

  /**
   * hash password*/
  password = await hashPassword(password);

  createAuthCookie(res, {
    firstName: firstName,
    lastName: lastName,
    email: email,
  });

  return res.status(200).json({
    success: true,
    message: "User registered successfully",
  });
});

module.exports = { registerUser };
