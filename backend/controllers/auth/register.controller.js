const {CatchAsyncErrors} = require("../../helpers/catchAsyncErrors.helper");
const {
    hashPassword
    , createAuthCookie
    , checkPassword
} = require("../../helpers/auth.helper");
const {responseHelper} = require("../../helpers/responseHelper")
/**
 *
 * @param {*} req request body object
 * @param {*} res response body object
 * @returns success true, false if errored
 */

const registerUser = CatchAsyncErrors(async (req, res) => {
    /**
     * destructure user properties
     */
    let {firstName, lastName, email, password} = req.body;

    /**
     * check if User exists
     * */
    const userExists = await req.db_context.exec("findUser", [email]);

    if (userExists != null) return responseHelper(res, 409, false, "Email already in use")

    /**
     * hash password*/
    password = await hashPassword(password);

    /**
     * Save new validated user to db
     * */
    const saveNewUser = await req.db_context.exec("UserSave", [
        firstName, lastName, email, password
    ])

    createAuthCookie(res, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userid: saveNewUser["userid"],
    });

    return responseHelper(res, 200, true, "User has been registered successfully")
});


/**
 * @param {email,password} req req body object
 * @param {*} res res body object
 * @returns success true, false if it errored
 * */
const loginUser = CatchAsyncErrors(async (req, res) => {
    let {email, password} = req.body;
    /**
     * check if User exists by email
     * */

    const userExists = await req.db_context.search("Users", {
        email: email,
    });

    if (!userExists)
        return responseHelper(
            res,
            404,
            false,
            "Email or password is wrong. Try again!",
        );

    /**
     * compare passwords
     */
    const isPassword = await checkPassword(password, userExists["passwordhash"]);
    if (!isPassword)
        return responseHelper(
            res,
            404,
            false,
            "password is wrong. Try again!",
        );

    console.log(userExists);
    /**
     * return authorization cookie
     * */
    createAuthCookie(res, {
        firstname: userExists["firstname"],
        lastname: userExists["lastname"],
        email: userExists["email"],
        userid: userExists["userid"],
    });
    return responseHelper(res, 200, true, "Welcome back!")
})

/**
 * logout User
 * */
const logOutUser = CatchAsyncErrors(async (req, res) => {
    res.cookie("cookie",
        null,
        {
            expires: new Date(Date.now()),
            httpOnly: true
        })

    return responseHelper(res, 200, true, "Logout successfull")
})


module.exports = {registerUser, loginUser, logOutUser};
