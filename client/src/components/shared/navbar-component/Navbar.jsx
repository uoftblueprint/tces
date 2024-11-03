import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import Dropdown from "./Dropdown";
import NavbarProfile from "./NavbarProfile";
import NavbarButton from "./NavbarButton";

function Navbar({ isAdmin, setLocalExitRoute }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const navigateToDashboard = () => {
    if (setLocalExitRoute != null) {
      setLocalExitRoute("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="nav-container">
        <div className="left-content">
          <div className="image">
            <Button
              onClick={navigateToDashboard}
              style={{
                borderRadius: "50%",
              }}
            >
              <img src="/img/tcesLogo.svg" alt="logo" width="46" height="50" />
            </Button>
          </div>
          <div className="left-content-buttons">
            <NavbarButton
              keyword="clients"
              setLocalExitRoute={setLocalExitRoute}
            />
            <NavbarButton
              keyword="job-leads"
              setLocalExitRoute={setLocalExitRoute}
            />
            <NavbarButton
              keyword="employers"
              setLocalExitRoute={setLocalExitRoute}
            />
            {/* New buttons for job postings and job applications */}
            <NavbarButton
              keyword="job-postings"
              setLocalExitRoute={setLocalExitRoute}
            />
            <NavbarButton
              keyword="job-applications"
              setLocalExitRoute={setLocalExitRoute}
            />
          </div>
        </div>
        <div className="right-content">
          <NavbarProfile toggleDropdown={toggleDropdown} />
        </div>
        {isDropdownVisible && (
          <Dropdown
            isAdmin={isAdmin}
            setIsDropdownVisible={setIsDropdownVisible}
            setLocalExitRoute={setLocalExitRoute}
          />
        )}
      </div>
      <Outlet />
    </>
  );
}

Navbar.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setLocalExitRoute: PropTypes.func,
};

Navbar.defaultProps = {
  setLocalExitRoute: null,
};

export default Navbar;
