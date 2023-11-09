import PropTypes from "prop-types";
import "./Navbar.css";

function NavbarButton({ title }) {
  return (
    <button type="button" className="nav-left-button">
      {title}
    </button>
  );
}

NavbarButton.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavbarButton;
