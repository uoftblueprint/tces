const User = require("../../models/user.model");

const isAdmin = async (user_id) => {
    const user = await User.findByPk(user_id)

    if (!user || !user.is_admin) {
        return false
    }
    return true
}




module.exports = {
    isAdmin: isAdmin
}