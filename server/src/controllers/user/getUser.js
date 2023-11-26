const User = require("../../models/user.model");

const getUserHandler = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const user = await User.findOne({ attributes: ['id', 'first_name', 'last_name', 'email', 'is_admin'], where: { id: user_id } })

        if (user) {
            return res.status(200).json({
                status: "success",
                message: "Got user data successfully",
                data: { user }
            });
        }
        return res.status(404).json({
            status: "fail",
            message: `User with id ${user_id} does not exist in the database`,
            data: null,
        });

    } catch (err) {
        return res
            .status(500)
            .json({ status: "error", message: "An unexpected error occured" });
    }
}


module.exports = getUserHandler;