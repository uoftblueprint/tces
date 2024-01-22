import { useState, useRef } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Typography,
  Menu,
  MenuItem,
  Card,
  CardContent,
  IconButton
} from "@mui/material";

import {
  HeaderContainer,
  TopRowContainer,
} from "./index.styles";
import EmployerType from '../../../prop-types/EmployerType';

function EmployerInfoComponent({ employer }) {
  const vertButtonRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    setAnchorEl(vertButtonRef.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
  <TopRowContainer style={{display: "flex", justifyContent: "space-between"}}>
    <div>
      <HeaderContainer>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: 700,
            lineHeight: "42px",
            letterSpacing: "0.25px",
            textAlign: "left",
          }}
        >
          {employer.name}
        </Typography>
        <IconButton onClick={handleClick}>
          <MoreVertIcon
            sx={{
              color: "gray",
              cursor: "pointer",
            }}
            ref={vertButtonRef}
          />
        </IconButton>

        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "split-button",
        }}
        PaperProps={{
          style: {
            width: vertButtonRef
              ? 190
              : null,
          },
        }}
        
        >
        <MenuItem onClick={handleClose}>
          <IconButton><DownloadIcon /></IconButton> Export as JSON
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <IconButton><DeleteIcon /></IconButton>Delete
        </MenuItem>
      </Menu>
      </HeaderContainer>
      <Typography
        style={{
          fontFamily: "Arial",
          textAlign: "left",
        }}
      >
        Employer
      </Typography>
    </div>

    <Card 
    style={{
    width: "15%",
    }}>
    <CardContent style={{
      display: "flex",
      justifyContent: "space-between",
    }}>
      <div style={{width: "50%"}}>
        <Typography
          variant="subtitle1"
          align="left"
          gutterBottom
        >
          Owner
        </Typography>
        <Typography
          variant="body2"
        >
          {employer.owner ? employer.owner : ""}
        </Typography>
      </div>
      <div style={{width: "50%"}}>
        <Typography
          variant="subtitle1"
          align="left"
          gutterBottom
        >
          Creator
        </Typography>
        
        <Typography
          variant="body2"
        >
          { employer.creator ? employer.creator : "" }
        </Typography>
      </div>

    </CardContent>
  </Card>
    
  </TopRowContainer>
  );
}

EmployerInfoComponent.propTypes = {
  employer: EmployerType.isRequired,
};

export default EmployerInfoComponent;