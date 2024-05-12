import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import "./Dropdown.css";
import DropdownItem from "./DropdownItem";

function Dropdown({ isAdmin, setIsDropdownVisible, setLocalExitRoute }) {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdownVisible(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className="dropdown-container" ref={wrapperRef}>
      <div className="dropdown-title">Profile</div>
      <div className="dropdown-items">
        {isAdmin && (
          <DropdownItem
            keyword="admin"
            setIsDropdownVisible={setIsDropdownVisible}
            setLocalExitRoute={setLocalExitRoute}
          />
        )}
        <DropdownItem
          keyword="settings"
          setIsDropdownVisible={setIsDropdownVisible}
          setLocalExitRoute={setLocalExitRoute}
        />
        <DropdownItem
          keyword="logout"
          setIsDropdownVisible={setIsDropdownVisible}
          setLocalExitRoute={setLocalExitRoute}
        />
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setIsDropdownVisible: PropTypes.func.isRequired,
  setLocalExitRoute: PropTypes.func,
};

Dropdown.defaultProps = {
  setLocalExitRoute: null,
};

export default Dropdown;
