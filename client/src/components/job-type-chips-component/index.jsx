import PropTypes from "prop-types";
import { Box } from "@mui/material";

// Define chip colors based on job types
const chipColors = {
  "Full-Time": { bg: "#FFB6C1", text: "#000" }, // Light pink
  "Part-time": { bg: "#ADD8E6", text: "#000" }, // Light blue
  Permanent: { bg: "#FFDAB9", text: "#000" }, // Peach
  Contract: { bg: "#DDA0DD", text: "#000" }, // Plum
  Seasonal: { bg: "#E0FFFF", text: "#000" }, // Light cyan
  Freelance: { bg: "#FF69B4", text: "#000" }, // Pink
  Internship: { bg: "#D3D3D3", text: "#000" }, // Light grey
};

function JobTypeChipsComponent({ jobTypes }) {
  // ! This is a custom component so I probably shouldn't use anything built in for MUI
  // ! Maybe the box component, or the thing that encapsulates the Job Type Chips?
  // ! The input prop should be the same as the ENUM value array as the job posting job_types attribute.
  // ! type: DataTypes.JSON, // Using JSON to store multiple job types
  // ! This is the type.

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1, // Spacing between chips
        alignItems: "center",
      }}
    >
      {jobTypes.map((jobType) => {
        const { bg, text } = chipColors[jobType] || {
          bg: "#EEE",
          text: "#000",
        }; // Default colors
        return (
          <Box
            key={jobType}
            sx={{
              padding: "3px 12px",
              borderRadius: "16px",
              backgroundColor: bg,
              color: text,
              fontSize: "14px",
              border: "1px solid #CCC",
              textAlign: "center",
            }}
          >
            {jobType}
          </Box>
        );
      })}
    </Box>
  );
}

JobTypeChipsComponent.propTypes = {
  jobTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JobTypeChipsComponent;
