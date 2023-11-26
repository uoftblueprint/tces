const User = require("../../models/user.model");

const getAllUsersHandler = async (req, res) => {
    try {
        const page = Number(req.query.page)
        const limit = Number(req.query.limit)
        const users = await User.findAndCountAll({
            attributes: ['first_name', 'last_name', 'email', 'is_admin'],
            limit: limit,
            offset: (page - 1) * limit
        });

        return res.status(200).json({
            status: "success",
            message: "Got user data successfully",
            data: users
        });

    } catch (err) {
        return res
            .status(500)
            .json({ status: "error", message: "An unexpected error occured" });
    }
}


module.exports = getAllUsersHandler;