import { useState } from "react";
import logo from "../../../public/img/tces-logo.png";
import Dropdown from "./Dropdown";
import NavbarProfile from "./NavbarProfile";
import NavbarButton from "./NavbarButton";

function Navbar() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="nav-container">
      <div className="left-content">
        <div className="image">
          <img src={logo} alt="logo" width="46" height="50" />
        </div>
        <div className="left-content-buttons">
          <NavbarButton title="CLIENTS" />
          <NavbarButton title="JOB LEADS" />
          <NavbarButton title="EMPLOYERS" />
        </div>
      </div>
      <div className="right-content">
        <NavbarProfile toggleDropdown={toggleDropdown} />
      </div>
      {isDropdownVisible && <Dropdown isAdmin />}
    </div>
  );
}

export default Navbar;
