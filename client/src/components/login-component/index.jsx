import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Logo,
  MessageContainer,
  InputContainer,
  Input,
  Button,
  H3,
  P,
  ErrorMessage,
} from "./index.styles";
import login from "../../utils/api";

function LoginComponent({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await login(email, password);
      if (response.ok) {
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Logo src="./img/tcesLogo.svg" alt="TCES Logo" />
      <MessageContainer>
        <H3>Welcome back to TCES!</H3>
        <P>Log in below with your details.</P>
      </MessageContainer>
      <InputContainer>
        <Input
          placeholder="TCES Email"
          name="tces email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputContainer>
      <Button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "LOGGING IN..." : "LOG IN"}
      </Button>
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
}

LoginComponent.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginComponent;
