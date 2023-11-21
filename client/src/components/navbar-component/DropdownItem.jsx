import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminIcon from "@mui/icons-material/Group";
import Button from "@mui/material/Button";

function DropdownItem({ keyword }) {
  const navigate = useNavigate();
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
    settings: "/settings",
    logout: "/logout",
    admin: "/admin",
  };

  const onClickRoute = () => {
    navigate(routes[keyword]);
  };
  const icon = icons[keyword];
  const label = labels[keyword];

  return (
    <Button
      variant="text"
      className="dropdown-item-button"
      style={{ color: "rgba(0, 0, 0, 0.6)" }}
      onClick={onClickRoute}
    >
      <div className="dropdown-item-container">
        <div className="dropdown-item-left-content">
          {icon}
          <div className="dropdown-item-text">{label}</div>
        </div>
        <ArrowForwardIcon color="action" />
      </div>
    </Button>
  );
}

DropdownItem.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default DropdownItem;
