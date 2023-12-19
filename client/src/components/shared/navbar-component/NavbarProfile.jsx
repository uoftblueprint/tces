import PropTypes from "prop-types";
import "./Navbar.css";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function NavbarProfile({ toggleDropdown }) {
  return (
    <IconButton className="right-content-image" onClick={toggleDropdown}>
      <AccountCircleIcon />
    </IconButton>
  );
}

NavbarProfile.propTypes = {
  toggleDropdown: PropTypes.func.isRequired,
};

export default NavbarProfile;
