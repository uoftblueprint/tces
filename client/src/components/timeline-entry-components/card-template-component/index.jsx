import PropTypes from "prop-types";
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
  return (
    <Card>
      <ImageContainer>
        <Image src={imageUrl} alt="Card Image" />
        <Line />
      </ImageContainer>
      <ContentContainer>
        <Header>
          <Title>{title}</Title>
          <DateText>{new Date(dateAdded).toLocaleDateString()}</DateText>
        </Header>
        <Body>{body}</Body>
      </ContentContainer>
    </Card>
  );
}

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  dateAdded: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default CardComponent;
