const { validationResult,check } = require("express-validator");

const registerUser = (req, res) => {
  try {
    /**
     * destructure user properties
     */
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    /**
     * validate user properties
     */
    check(firstName, "First name is required").notEmpty();
    check(lastName, "Last Name is required").notEmpty();
    check(email, "Email is required").notEmpty();


    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(201).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { registerUser };
