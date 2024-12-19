import PropTypes from "prop-types";
import { Box } from "@mui/material";

// Define chip colors based on job types
const chipColors = {
  "Full-Time": { border: "#EF6C00", bg: "#FFF3E0", text: "#000" }, // Orange
  Freelance: { border: "#0288D1", bg: "#E1F5FE", text: "#000" }, // Blue
  Permanent: { border: "#827717", bg: "#F9FBE7", text: "#000" }, // Yellow-Green
  Contract: { border: "#8E24AA", bg: "#F3E5F5", text: "#000" }, // Purple
  Seasonal: { border: "#00838F", bg: "#E0F7FA", text: "#000" }, // Teal
  "Part-time": { border: "#EC407A", bg: "#FCE4EC", text: "#000" }, // Pink
  Internship: { border: "#3F51B5", bg: "#E8EAF6", text: "#000" }, // Indigo
};

function JobTypeChipsComponent({ jobTypes }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1, // Spacing between chips
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      {jobTypes.map((jobType) => {
        const { border, bg, text } = chipColors[jobType] || {
          border: "#CCC",
          bg: "#EEE",
          text: "#000",
        }; // Default colors
        return (
          <Box
            key={jobType}
            sx={{
              padding: "2px 12px",
              borderRadius: "16px",
              backgroundColor: bg,
              color: text,
              fontSize: "14px",
              border: `1px solid ${border}`,
              textAlign: "center",
              fontFamily: "'Roboto', sans-serif",
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
