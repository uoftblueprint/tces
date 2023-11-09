import PropTypes from "prop-types";
import "./Dropdown.css";
import DropdownItem from "./DropdownItem";

function Dropdown({ isAdmin }) {
  return (
    <div className="dropdown-container">
      <div className="dropdown-title">Profile</div>
      <div className="dropdown-items">
        {isAdmin && <DropdownItem label="Admin Dashboard" keyword="admin" />}
        <DropdownItem label="Settings" keyword="settings" />
        <DropdownItem label="Log Out" keyword="logout" />
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Dropdown;
