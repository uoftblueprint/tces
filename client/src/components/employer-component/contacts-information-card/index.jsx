import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Divider,
} from "../index.styles";

import BoxRowComponent from "../box-row-component";


function ContactsInformationCard() {
  return (
    <Card 
      style={{
      width: "33%",
      }}>
      <CardContent style={{
        display: "flex",
        justifyContent: "space-between",
      }}>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
        >
          Contacts
        </Typography>
        <div className="iconContainer">
          <IconButton>
            <EditIcon
            sx={{
              color: "gray",
              cursor: "pointer",
              align: "center",
            }}
            />
          </IconButton>
          <IconButton>
            <AddIcon
            sx={{
              color: "gray",
              cursor: "pointer",
              align: "center",
            }}
            />
          </IconButton>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
        <BoxRowComponent leftSide="Name" rightSide="Name" />
        <BoxRowComponent leftSide="Job Title" rightSide="Job Title" />
        <BoxRowComponent leftSide="Email" rightSide={<a href="mailto:example@example.com">example@example.com</a>} copyable />
        <BoxRowComponent leftSide="Phone Number" rightSide={<a href="tel:111-111-1111">+1 111 111 1111</a>} />
        <BoxRowComponent leftSide="Alternative Phone Number" rightSide={<a href="tel:111-111-1111">+1 111 111 1111</a>} />
      </CardContent>
    </Card>
  );
}


ContactsInformationCard.propTypes = {
}

export default ContactsInformationCard;