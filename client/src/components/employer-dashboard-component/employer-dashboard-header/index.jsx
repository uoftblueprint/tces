import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { IconButton, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HeaderContainer } from "../index.styles";
import { getFilteredEmployers } from "../../../utils/api";
import { formatDateStr } from "../../../utils/date";

function EmployerDashboardHeader({
  numEntries,
  generateFilterParams,
  filterParams,
}) {
  const navigate = useNavigate();

  const generateCSV = async () => {
    const req = await getFilteredEmployers(generateFilterParams(filterParams));
    const { data } = await req.json();
    console.log(data);
    const csvData = [
      ["Employer Name", "Date", "Phone Number", "Email", "Owner"],
    ];

    data.forEach((emp) =>
      csvData.push([
        emp.name,
        formatDateStr(emp.date_added),
        emp.phone_number,
        emp.email,
        emp.ownerName,
      ]),
    );
    console.log(csvData.map((e) => e.join(",")).join("\n"));
    const csvContent = `${csvData.map((e) => e.join(",")).join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const href = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("download", "employer_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".
  };

  const handleBackClick = () => {
    navigate("/dashboard");
  };

  return (
    <HeaderContainer>
      <IconButton
        sx={{
          marginRight: 2,
          marginLeft: 2,
        }}
        onClick={handleBackClick}
        size="small"
      >
        <ArrowBackIcon
          sx={{
            color: "gray",
            cursor: "pointer",
          }}
        />
      </IconButton>
      <div style={{ flexGrow: 1 }}>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "34px",
            fontWeight: 500,
            lineHeight: "60px",
            letterSpacing: "0.25px",
            textAlign: "left",
          }}
        >
          All Employers
        </Typography>
        <Typography
          style={{
            fontFamily: "Arial",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "0px",
            letterSpacing: "0.1px",
            textAlign: "left",
            color: "#00000099",
          }}
        >
          {numEntries} Employers
        </Typography>
      </div>
      <Button
        sx={{
          marginLeft: "auto",
          marginBottom: "30px",
          marginTop: "30px",
          backgroundColor: "#ffffff0",
          color: "#3568E5",
          border: 1,
          "&:hover": {
            backgroundColor: "#3568E5",
            color: "white",
          },
        }}
        startIcon={<DownloadIcon />}
        onClick={generateCSV}
      >
        EXPORT CURRENT FILTER VIEW ({numEntries} EMPLOYERS)
      </Button>
      <Button
        sx={{
          marginLeft: "16px",
          marginBottom: "30px",
          marginTop: "30px",
          backgroundColor: "#3568E5",
          border: 1,
          color: "white",
          "&:hover": {
            backgroundColor: "white",
            color: "#3568E5",
          },
        }}
        startIcon={<AddIcon />}
        onClick={() => navigate("/employers/add")}
      >
        ADD NEW EMPLOYER
      </Button>
    </HeaderContainer>
  );
}

EmployerDashboardHeader.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  numEntries: PropTypes.number.isRequired,
  generateFilterParams: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  filterParams: PropTypes.object.isRequired,
};

export default EmployerDashboardHeader;
