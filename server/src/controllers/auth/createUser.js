const User = require("../../models/user.model");
const crypto = require("crypto");

const createUserRequestHandler = async (req, res, next) => {
  try {
    // Generate salt value
    const salt = crypto.randomBytes(16);

    // synchronous hashing function
    const hashedPassword = crypto.pbkdf2Sync(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
    );

    await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
    });

    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
    });
  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      res.status(403).json({
        status: "error",
        message: "A user with this email already exists in the database",
      });
      return;
    }
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Unexpected server error",
    });
  }
};

module.exports = createUserRequestHandler;
