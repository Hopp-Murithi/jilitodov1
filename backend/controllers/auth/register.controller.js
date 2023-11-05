const { CatchAsyncErrors } = require("../../helpers/catchAsyncErrors.helper");
const { hashPassword, createAuthCookie } = require("../../helpers/auth.helper");
const {responseHelper} =require("../../helpers/responseHelper")
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
   * check if User exists
   * */
  const userExists = await req.db_context.exec("findUser",[email]);

  if(userExists != null) return responseHelper(res,409,false,"Email already in use")

  /**
   * hash password*/
  password = await hashPassword(password);

  /**
   * Save new validated user to db
   * */
  const saveNewUser= await req.db_context.exec("UserSave",[
    firstName, lastName, email, password
  ])

  createAuthCookie(res, {
    firstName: firstName,
    lastName: lastName,
    email: email,
    userid: saveNewUser["userid"],
  });

  return responseHelper(res,200,true,"User has been registered successfully")
});

module.exports = { registerUser };
