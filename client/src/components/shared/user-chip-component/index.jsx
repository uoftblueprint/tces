import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { Edit } from "@mui/icons-material";
import PropTypes from "prop-types";
import { getInitialsAndDisplayName } from "../../../utils/users";
import UserType from "../../../prop-types/UserType";

function UserChipComponent({ user, edit, onClick }) {
  const { initials, fullName } = getInitialsAndDisplayName(user);

  return (
    <Chip
      avatar={<Avatar>{initials}</Avatar>}
      label={fullName}
      variant="outlined"
      onDelete={edit ? onClick : undefined}
      deleteIcon={edit ? <Edit /> : undefined}
    />
  );
}

UserChipComponent.propTypes = {
  user: UserType.isRequired,
  edit: PropTypes.bool,
  onClick: PropTypes.func,
  // eslint-disable-next-line
};
UserChipComponent.defaultProps = {
  edit: false,
  onClick: () => {},
};

export default UserChipComponent;
