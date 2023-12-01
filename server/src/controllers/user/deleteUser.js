const User = require("../../models/user.model");

const deleteUserHandler = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: `User with id ${user_id} does not exist in the database`,
        data: null,
      });
    }

    await user.destroy();
    return res.status(204).json({
      status: "success",
      message: `No Content`,
      data: null,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = deleteUserHandler;
