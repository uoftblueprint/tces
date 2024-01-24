import Button from "@mui/material/Button";
import {
    // TextField,
    // Stack,
    // Button,
    Grid,
    Card,
    CardContent,
    Box
    // Typography,
  } from "@mui/material";
  import MoreVertIcon from '@mui/icons-material/MoreVert';
  import ButtonGroup from "@mui/material/ButtonGroup";
  import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
  import Typography from "@mui/material/Typography";


export default function Timeline() {
    
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
              style={{ width: "100%" }}
            >
              <Button style={{ width: "100%" }}> + Add new Entry</Button>
              <Button
                size="small"
                aria-label="select merge strategy"
                aria-haspopup="menu"
              >
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>
          </Box>
        </CardContent>             
    </Card>
        
    );

}