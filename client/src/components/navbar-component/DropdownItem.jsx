import PropTypes from "prop-types";
import "./Navbar.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminIcon from "@mui/icons-material/Group";
import IconButton from "@mui/material/IconButton";

function DropdownItem({ keyword }) {
  const icons = {
    settings: <SettingsIcon color="action" />,
    logout: <LogoutIcon color="action" />,
    admin: <AdminIcon color="action" />,
  };

  const labels = {
    settings: "Settings",
    logout: "Log Out",
    admin: "Admin Dashboard",
  };

  const routes = {
    settings: "#",
    logout: "#",
    admin: "#",
  };

  const icon = icons[keyword];
  const label = labels[keyword];
  const route = routes[keyword];

  return (
    <div className="dropdown-item-container">
      <div className="dropdown-item-left-content">
        {icon}
        <div className="dropdown-item-text">{label}</div>
      </div>
      <IconButton href={route}>
        <ArrowForwardIcon color="action" />
      </IconButton>
    </div>
  );
}

DropdownItem.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default DropdownItem;
