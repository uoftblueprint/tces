import PropTypes from "prop-types";
import { Box } from "@mui/material";

// Define chip colors based on application statuses
const chipColors = {
  Contacted: { border: "#0057B2", bg: "#E3F2FD", text: "#000" },
  Rejected: { border: "#B71C1C", bg: "#FEEBEE", text: "#000" },
  "R and I": { border: "#424242", bg: "#E0E0E0", text: "#000" },
  Approved: { border: "#1B5E20", bg: "#E8F5E9", text: "#000" },
  "In Progress": { border: "#EF6C00", bg: "#FFF3E0", text: "#000" },
  New: { border: "#EC407A", bg: "#F3E5F5", text: "#000" },
};

function ApplicationStatusChipComponent({ status }) {
  const { border, bg, text } = chipColors[status] || {
    border: "#CCC",
    bg: "#EEE",
    text: "#000",
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        alignItems: "center",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Box
        key={status}
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
        {status}
      </Box>
    </Box>
  );
}

ApplicationStatusChipComponent.propTypes = {
  status: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ApplicationStatusChipComponent;
