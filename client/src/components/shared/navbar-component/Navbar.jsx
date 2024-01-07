import { useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import Dropdown from "./Dropdown";
import NavbarProfile from "./NavbarProfile";
import NavbarButton from "./NavbarButton";

function Navbar({ isAdmin }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <div className="nav-container">
        <div className="left-content">
          <div className="image">
            <img src="./img/tcesLogo.svg" alt="logo" width="46" height="50" />
          </div>
          <div className="left-content-buttons">
            <NavbarButton keyword="clients" />
            <NavbarButton keyword="job-leads" />
            <NavbarButton keyword="employers" />
          </div>
        </div>
        <div className="right-content">
          <NavbarProfile toggleDropdown={toggleDropdown} />
        </div>
        {isDropdownVisible && (
          <Dropdown
            isAdmin={isAdmin}
            setIsDropdownVisible={setIsDropdownVisible}
          />
        )}
      </div>
      <Outlet />
    </>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
};

export default Navbar;
