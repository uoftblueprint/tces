const User = require("../../models/user.model");
const sequelize = require("sequelize");
const Op = sequelize.Op;

const getAllUsersHandler = async (req, res) => {
  try {
    let query_spec = {
      attributes: ["id", "first_name", "last_name", "email", "is_admin"],
    }
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    if (page && limit) {
      query_spec = {
        ...query_spec,
        limit: limit,
        offset: (page - 1) * limit,
      }
    }
    const name = req.query.name
    if (name) {
      query_spec = {
        ...query_spec,
        where: {
          [Op.and]: sequelize.literal(`LOWER(CONCAT(first_name, ' ', last_name)) LIKE :name`),
        },
        replacements: { name: `%${name.toLowerCase()}%` },
      }
    }
    const users = await User.findAndCountAll(query_spec);

    return res.status(200).json({
      status: "success",
      message: "Got user data successfully",
      data: users,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ status: "error", message: "An unexpected error occured" });
  }
};

module.exports = getAllUsersHandler;
