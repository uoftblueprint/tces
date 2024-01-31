import { useState, useRef } from "react";
import {
    Button,
    ButtonGroup,
    Grid,
    Card,
    CardContent,
    Box,
    Tab,
    Typography,
    Divider,
    Menu,
    MenuItem,
    TextField,
  } from "@mui/material";
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import AddIcon from "@mui/icons-material/Add";
  import TabContext from '@mui/lab/TabContext';
  import TabList from '@mui/lab/TabList';
  import TabPanel from '@mui/lab/TabPanel';
  import InputAdornment from "@mui/material/InputAdornment";
  import SearchIcon from "@mui/icons-material/Search";


export default function Timeline() {
  const [value, setValue] = useState('1');
  const [searchTerm, setSearchTerm] = useState("");
  const buttonGroupRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  

  const handleClick = () => {
    setAnchorEl(buttonGroupRef.current);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchTerm((event.target.value).toLowerCase());
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
    
    return (
    <Card style={{ width: "500px"}}>
      <Box paddingTop={2} paddingBottom={2} paddingLeft={2}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={11}>
            <Typography variant="h5" align="left">Activity Timeline</Typography>
          </Grid>
          <Grid item xs={1}>
            <MoreVertIcon />
          </Grid>
        </Grid>
      </Box>

          <CardContent>
          
            <ButtonGroup
              variant="contained"
              style={{ width: "100%", borderRadius: "8px" }}
              aria-label="split button"
              ref={buttonGroupRef}
              color="primary"
              sx={{'& .MuiButtonBase-root': {backgroundColor: "#3568E5"}}}
              
            >
              <Button fullWidth startIcon={<AddIcon />}>Add New Entry</Button>
              <Button onClick={handleClick}>
                <ArrowDropDownIcon />
              </Button>
              <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "split-button",
              }}
              PaperProps={{
                style: {
                  width: buttonGroupRef
                    ? buttonGroupRef.current?.clientWidth
                    : null,
                },
              }}
              >
                <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }} >
                  Placed Job Seeker
                </MenuItem>
                <MenuItem onClick={handleClose} sx={{ justifyContent: "center" }} >
                  Other Note
                </MenuItem>

              </Menu>
            </ButtonGroup>

           
           
            <TabContext value={value}>
              <TabList onChange={handleChange} sx={{
        '& .MuiTabs-flexContainer': { display: 'flex', width: "100%", gap: -2 }, 
        '& .MuiButtonBase-root': {padding: 0}
      }}>
                <Tab label="ALL" value="1" />
                <Tab label="CONTACTED" value="2" />
                <Tab label="UPDATES" value="3" />
                <Tab label="NOTES" value="4" />
              </TabList>
        
        <Divider/>
        <TabPanel value="1">ALL</TabPanel>
        <TabPanel value="2">CONTACTED</TabPanel>
        <TabPanel value="3">UPDATES</TabPanel>
        <TabPanel value="4">NOTES</TabPanel>
        
      </TabContext>

      
      
      
          
        </CardContent>
        <TextField
      id="search"
      type="search"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      fullWidth
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ fontSize: '2rem' }}/>
          </InputAdornment>
        ),
      }}
    />             
    </Card>
        
    );

}