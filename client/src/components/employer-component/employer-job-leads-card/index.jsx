import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Divider } from "../index.styles";

function EmployerJobLeadsCard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gridColumnGap: "30px",
        height: 400,
        marginTop: "10px",
        width: "100%",
      }}
    >
      <Card
        style={{
          width: "66%",
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" align="left" gutterBottom>
            Job Leads
          </Typography>
          <IconButton>
            <AddIcon
              sx={{
                color: "gray",
                cursor: "pointer",
                align: "center",
              }}
            />
          </IconButton>
        </CardContent>
        <Divider />
        <CardContent>
          <Typography sx={{ mb: 0.5 }} color="text.secondary">
            <TextField
              type="text"
              value="aaa"
              onChange={() => {}}
              size="small"
              style={{
                borderWidth: "10px",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => {}}>
            Reset Filters
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default EmployerJobLeadsCard;
