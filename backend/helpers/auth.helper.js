const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = (rawPassword) => {
    return bcrypt.hashSync(rawPassword, Number(process.env.PASSWORD_SALT_ROUNDS));
  };

  const createAuthCookie = (res, cookiePayload) => {
    const cookie = jwt.sign(cookiePayload, process.env.JWT_SECRET, {
      expiresIn: process.env.COOKIE_EXPIRES_TIME,
    });
  
    res.cookie("cookie", cookie, {
      expires: new Date(Date.now() + Number(10) * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });
  };

  /**
   * check password login
   * */
  const checkPassword = (submittedPassword,dbHashedPassword)=>{
    return bcrypt.compareSync(submittedPassword,dbHashedPassword)
  }
  
  module.exports = { hashPassword, createAuthCookie, checkPassword };