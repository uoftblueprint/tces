import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ErrorContainer, ErrorMessage, BackButton } from "./index.styles";

function ErrorComponent({ message }) {
  const navigate = useNavigate();

  return (
    <ErrorContainer>
      <ErrorMessage>Error: {message}</ErrorMessage>
      <BackButton onClick={() => navigate("/logout")}>
        Back to Main Menu
      </BackButton>
    </ErrorContainer>
  );
}

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorComponent;
