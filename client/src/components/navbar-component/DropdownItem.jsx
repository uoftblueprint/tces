import PropTypes from "prop-types";
import "./Navbar.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminIcon from "@mui/icons-material/Group";

function DropdownItem({ label, keyword }) {
  const icons = {
    settings: <SettingsIcon color="action" />,
    logout: <LogoutIcon color="action" />,
    admin: <AdminIcon color="action" />,
  };

  const icon = icons[keyword];

  return (
    <div className="dropdown-item-container">
      <div className="dropdown-item-left-content">
        {icon}
        <div className="dropdown-item-text">{label}</div>
      </div>
      <ArrowForwardIcon color="action" />
    </div>
  );
}

DropdownItem.propTypes = {
  label: PropTypes.string.isRequired,
  keyword: PropTypes.string.isRequired,
};

export default DropdownItem;
