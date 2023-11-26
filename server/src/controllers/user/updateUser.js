const User = require("../../models/user.model");
const crypto = require("crypto");

const updateUserHandler = async (req, res) => {
    try {
        const user_id = Number(req.params.user_id);
        let user = await User.findOne({ attributes: ['id', 'first_name', 'last_name', 'email', 'is_admin', 'salt'], where: { id: user_id } })

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: `User with id ${user_id} does not exist in the database`,
                data: null,
            });
        }
        // Generate salt value
        let update_values = {}
        if (req.body.password) {
            const salt = crypto.randomBytes(16);

            const password = crypto.pbkdf2Sync(
                req.body.password,
                salt,
                310000,
                32,
                "sha256",
            );
            update_values = { ...req.body, password: password, salt: salt }
        } else {
            update_values = { ...req.body }
        }

        try {
            user = await user.update(update_values)
        } catch (err) {
            return res
                .status(400)
                .json({ status: "error", message: "Invalid Data Provided" });
        }
        return res.status(200).json({
            status: "success",
            message: "Successfully updated user data",
            data: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        });


    } catch (err) {
        throw err
        return res
            .status(500)
            .json({ status: "error", message: "An unexpected error occured" });
    }
}


module.exports = updateUserHandler;