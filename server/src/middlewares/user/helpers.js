const User = require("../../models/user.model");

const isGivenUser = async (curr_user_id, desired_user_id) => {
    if (curr_user_id != desired_user_id) {
        return false
    }
    const curr_user = await User.findByPk(curr_user_id);
    const desired_user = await User.findByPk(desired_user_id);

    if (!curr_user || !desired_user) {
        return false
    }
    return true
}




module.exports = {
    isGivenUser: isGivenUser
}