import React, {useState} from 'react'
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";


export default function ActivityTimeline() {

  const [list, setList] = useState<any>([]);
  const [input, setInput] = useState<string>("");

  const addActivity = (activity: string) => {
    const newActivity = {
      id: Math.random(),
      activity: activity,
    };
    setList(([...list, newActivity]));
    setInput("");
  };

  return(
    <div>
      <ul>
        {list.map((activity: any) => (
          <li key={activity.id} style={{ listStyleType: "none" }}>
            <Timeline onResize={undefined} onResizeCapture={undefined}>
              <TimelineItem>
                <TimelineSeparator>
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>{activity.activity}</TimelineContent>
              </TimelineItem>
            </Timeline>
          </li>
        ))}
      </ul>
    <Stack direction="column" alignItems="center"> 
    <Stack spacing={2} direction="row" alignItems="center">  
      <TextField 
        id="outlined-basic"
        label="Enter Activity"
        variant="outlined" type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        />
      <Button variant="contained" type="submit" onClick={() => addActivity(input)}>Submit</Button>
    </Stack>
    </Stack>
    </div>
  );
}