import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { getInitialsAndDisplayName } from "../../../utils/users";
import UserType from "../../../prop-types/UserType";

function UserChipComponent({ user }) {
  const { initials, fullName } = getInitialsAndDisplayName(user);

  return (
    <Chip
      avatar={<Avatar>{initials}</Avatar>}
      label={fullName}
      variant="outlined"
    />
  );
}

UserChipComponent.propTypes = {
  user: UserType.isRequired,
  // eslint-disable-next-line
};

export default UserChipComponent;
