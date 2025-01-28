import { Outlet, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function PublicNavbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="nav-container">
        <div className="left-content">
          <div className="image">
            <Button
              onClick={() => navigate("/job-postings-client")}
              style={{
                borderRadius: "50%",
              }}
            >
              <img src="/img/tcesLogo.svg" alt="logo" width="46" height="50" />
            </Button>
          </div>
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

export default PublicNavBar;
