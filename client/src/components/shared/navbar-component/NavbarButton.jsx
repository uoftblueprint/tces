import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function NavbarButton({ keyword, setLocalExitRoute }) {
  const navigate = useNavigate();

  const titles = {
    clients: "CLIENTS",
    "job-leads": "JOB LEADS",
    employers: "EMPLOYERS",
  };

  const routes = {
    clients: "/clients",
    "job-leads": "/job-leads",
    employers: "/employers",
  };

  const title = titles[keyword];
  const route = routes[keyword];

  const onRouteClick = () => {
    if (setLocalExitRoute !== null) {
      setLocalExitRoute(route);
    } else {
      navigate(route);
    }
  };

  return (
    <Button
      variant="text"
      className="nav-left-button"
      style={{ color: "rgba(0, 0, 0, 0.6)" }}
      onClick={onRouteClick}
    >
      {title}
    </Button>
  );
}

NavbarButton.propTypes = {
  keyword: PropTypes.string.isRequired,
  setLocalExitRoute: PropTypes.func,
};

NavbarButton.defaultProps = {
  setLocalExitRoute: null,
};

export default NavbarButton;
