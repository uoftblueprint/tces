import {
  Box,
  TextField,
  Stack,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

const styles = {
  body: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Helvetica",
    backgroundColor: "#f0f3f8",
  },
  heading: {
    display: "flex",
    width: "47.5rem",
    paddingRight: "0px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0.625rem",
  },
  cancel: {
    marginRight: "auto",
  },
};

function Edit() {
  return (
    <section style={styles.body}>
      <Stack maxWidth="md" gap={4}>
        <Box style={styles.heading}>
          <Typography variant="h3">Edit User</Typography>
          <Typography variant="body1">
            Edit existing user information
          </Typography>
        </Box>

        <Card>
          <CardHeader title="User Information" />
          <CardContent>
            <Stack gap={1.5}>
              <TextField
                id="firstname"
                label="First Name"
                helperText="*Required"
              />
              <TextField
                id="lastname"
                label="Last Name"
                helperText="*Required"
              />
              <TextField id="email" label="Email" helperText="*Required" />
              <TextField
                id="password"
                label="Password"
                helperText="*Required"
              />
            </Stack>
          </CardContent>
        </Card>
        <Stack direction="row">
          <Button variant="outlined" size="large" style={styles.cancel}>
            Cancel
          </Button>
          <Button variant="contained" size="large">
            Save
          </Button>
        </Stack>
      </Stack>
    </section>
  );
}

export default Edit;
