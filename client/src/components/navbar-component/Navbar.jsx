import { useState } from "react";
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
          <img src="./img/tcesLogo.svg" alt="logo" width="46" height="50" />
        </div>
        <div className="left-content-buttons">
          <NavbarButton keyword="clients" />
          <NavbarButton keyword="jobleads" />
          <NavbarButton keyword="employers" />
        </div>
      </div>
      <div className="right-content">
        <NavbarProfile toggleDropdown={toggleDropdown} />
      </div>
      {isDropdownVisible && (
        <Dropdown isAdmin setIsDropdownVisible={setIsDropdownVisible} />
      )}
    </div>
  );
}

export default Navbar;
