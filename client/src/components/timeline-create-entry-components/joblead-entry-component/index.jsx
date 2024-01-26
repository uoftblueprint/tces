import { useState } from "react"
import { Card, Box, Avatar, CardContent, TextField, Button, Typography, Divider } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
// import CloseIcon from '@mui/icons-material/Close';

function JobLeadEntryComponent() {
    const [notes, setNotes] = useState("")

    const handleNoteChange = (e) => {
        setNotes(e.target.value)
    }

    return (
        <Card sx={{ height: 791, width: 391 }}>
            <CardContent>
                <Typography variant="h5">Activity Timeline</Typography>
                <Box sx={{ display: "flex", marginTop: "12px" }}>
                    <Box>
                        <Avatar sx={{ bgcolor: "rgba(255, 180, 0, 1)", width: "30px", height: "30px" }}>
                            <CreateIcon sx={{ width: "18px", height: "18px" }}/>
                        </Avatar>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "16px" }}>
                <Typography>Write a Note</Typography>
                    </Box>
                </Box>
            </CardContent>
            <Divider />
            <CardContent>
                <TextField
                    fullWidth
                    label="Write your note"
                    margin="normal"
                    multiline
                    variant="outlined"
                    rows={23}
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

export default JobLeadEntryComponent;
