import { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import {
  Card,
  ImageContainer,
  Image,
  Line,
  ContentContainer,
  Header,
  Title,
  DateText,
  Body,
} from "./index.styles";

function CardComponent({ title, dateAdded, body, imageUrl }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongBody = body.length > 200;

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card>
      <ImageContainer>
        <Image src={imageUrl} alt="Card Image" />
        <Line />
      </ImageContainer>
      <Line />
      <ContentContainer>
        <Header>
          <Title>{title}</Title>
          <DateText>{new Date(dateAdded).toLocaleDateString()}</DateText>
        </Header>
        <Body expanded={isExpanded}>{body}</Body>
        {isLongBody && (
          <Button
            variant="text"
            onClick={toggleExpansion}
            sx={{
              p: 0,
              color: "#3568E5",
              width: "fit-content",
              fontWeight: "bold",
              fontSize: "0.75rem",
            }}
          >
            {isExpanded ? "READ LESS" : "READ MORE"}
          </Button>
        )}
      </ContentContainer>
    </Card>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  body: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CardComponent;
