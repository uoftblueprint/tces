import * as React from "react";
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
  } from "@mui/material";
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import TabContext from '@mui/lab/TabContext';
  import TabList from '@mui/lab/TabList';
  import TabPanel from '@mui/lab/TabPanel';


export default function Timeline() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    
    return (
    <Card style={{ width: "400px"}}>
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
          <Box>
            <ButtonGroup
              variant="contained"
              style={{ width: "100%", borderRadius: "8px" }}
            >
              <Button style={{ width: "100%", backgroundColor: "#3568E5" }}> + Add new Entry</Button>
              <Button
                size="small"
                aria-label="select merge strategy"
                aria-haspopup="menu"
                style={{paddingTop: "6px", 
                paddingRight:"16px", 
                paddingBottom: "6px", 
                paddingLeft: "16px",
                backgroundColor: "#3568E5"
              }}
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
            <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <Divider variant="middle"/>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
      
      
          </Box>
        </CardContent>             
    </Card>
        
    );

}