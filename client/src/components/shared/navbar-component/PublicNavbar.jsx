import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const titleStyle = {
  fontFamily: "Inter",
  fontWeight: 500,
  fontSize: "20px",
  lineHeight: "32px",
  letterSpacing: "0.15px",
  color: "#6B74B1",
  marginLeft: "40px",
};

function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-container">
        <div className="left-content">
          <div className="image">
            <Button
              onClick={() => navigate("/job-postings")}
              style={{
                borderRadius: "50%",
              }}
            >
              <img src="/img/tcesLogo.svg" alt="logo" width="46" height="50" />
            </Button>
          </div>
          <h1 className="title" style={titleStyle}>
            Toronto Community Employment Services Job Board
          </h1>
        </div>
        <div className="right-content">
          <Button
            onClick={() => navigate("/signin")}
            variant="contained"
            color="primary"
            style={{ width: "auto" }}
          >
            Login
          </Button>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default PublicNavbar;
