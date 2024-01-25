import { useState } from "react";
import { Card, Box, Avatar, CardContent, TextField, Button, Typography, Divider, Select, MenuItem } from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// import CloseIcon from '@mui/icons-material/Close';

function ClientEntryComponent() {
    const [selectedValue, setSelectedValue] = useState('Client');

    const handleChange = (e) => {
      setSelectedValue(e.target.value);
    };

    return (
        <Card sx={{ height: 791, width: 391 }}>
            <CardContent>
                <Typography variant="h5">Activity Timeline</Typography>
                <Box sx={{ display: "flex", marginTop: "12px" }}>
                    <Box>
                        <Avatar sx={{ bgcolor: "rgba(229, 53, 104, 1)", width: "30px", height: "30px" }}>
                            <PhoneIphoneIcon sx={{ width: "18px", height: "18px" }}/>
                        </Avatar>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "16px" }}>
                <Typography>Contacted Employer</Typography>
                    </Box>
                </Box>
            </CardContent>
            <Divider />
            <CardContent>
            <Typography sx={{ color: "rgba(117, 117, 117, 1)" }}>Select the Employer Contact</Typography>
                <Select
                 fullWidth
                 value={selectedValue}
                 onChange={handleChange}
                 label="Choose an option"
                 sx={{ borderRadius: '10px' }} 
                >
                <MenuItem value="Client">Client</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label="Add additional notes"
                    margin="normal"
                    multiline
                    variant="outlined"
                    rows={20}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <Button variant="outlined">DISCARD</Button>
                    <Button variant="contained">POST</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ClientEntryComponent;
