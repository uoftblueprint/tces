const sequelize = require("sequelize");
const User = require("../../models/user.model");
const JobLead = require("../../models/job_lead.model");

const { Op } = sequelize;

const getAllUsersHandler = async (req, res) => {
  try {
    let query_spec = {
      attributes: ["id", "first_name", "last_name", "email", "is_admin"],
    };
    const page = req?.query?.page ? parseInt(req.query.page, 10) : null;
    const pageSize = req?.query?.pageSize
      ? parseInt(req.query.pageSize, 10)
      : null;

    if (page !== null && pageSize !== null) {
      query_spec.limit = pageSize;
      query_spec.offset = pageSize * page;
    }

    const { name, avoidAdmins } = req.query;
    if (name) {
      query_spec = {
        ...query_spec,
        where: {
          [Op.and]: sequelize.literal(
            `LOWER(CONCAT(first_name, ' ', last_name)) LIKE :name`,
          ),
        },
        replacements: { name: `%${name.toLowerCase()}%` },
      };
    }

    if (avoidAdmins === "true") {
      query_spec = {
        ...query_spec,
        where: {
          ...query_spec.where,
          is_admin: false,
        },
      };
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
