import { useState } from "react";
import { Card, Box, Avatar, CardContent, TextField, Button, Typography, Divider, Select, MenuItem } from "@mui/material";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// import CloseIcon from '@mui/icons-material/Close';

function EmployerEntryComponent() {
    const [selectedValue, setSelectedValue] = useState('Employer');
    const [notes, setNotes] = useState("")

    const handleValueChange = (e) => {
      setSelectedValue(e.target.value);
    };

    const handleNoteChange = (e) => {
        setNotes(e.target.value)
    }

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
                 onChange={handleValueChange}
                 label="Choose an option"
                 sx={{ borderRadius: '10px' }} 
                >
                <MenuItem value="Employer">Employer</MenuItem>
                </Select>
                <TextField
                    fullWidth
                    label="Add additional notes"
                    margin="normal"
                    multiline
                    variant="outlined"
                    rows={20}
                    value={notes}
                    onChange={handleNoteChange}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                    <Button variant="outlined">DISCARD</Button>
                    <Button variant="contained">POST</Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default EmployerEntryComponent;
