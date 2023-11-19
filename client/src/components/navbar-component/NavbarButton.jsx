import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./Navbar.css";

function NavbarButton({ keyword }) {
  const titles = {
    clients: "CLIENTS",
    jobleads: "JOB LEADS",
    employers: "EMPLOYERS",
  };

  const routes = {
    clients: "#",
    jobleads: "#",
    employers: "#",
  };

  const title = titles[keyword];
  const route = routes[keyword];
  return (
    <Button
      variant="text"
      className="nav-left-button"
      style={{ color: "rgba(0, 0, 0, 0.6)" }}
      href={route}
    >
      {title}
    </Button>
  );
}

NavbarButton.propTypes = {
  keyword: PropTypes.string.isRequired,
};

export default NavbarButton;
