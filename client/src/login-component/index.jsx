import { useState } from "react";
import {
  Container,
  Logo,
  MessageContainer,
  InputContainer,
  Input,
  Button,
  H3,
  P,
} from "./index.styles";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Create a JSON object with the required keys and values
    const loginData = {
      username: email,
      password,
    };

    // Convert the JSON object to a string
    const loginDataJSON = JSON.stringify(loginData);

    // Replace url with target route
    fetch("http://localhost:8000/auth/login/password", {
      method: "POST", // Not sure which method
      headers: {
        "Content-Type": "application/json",
      },
      body: loginDataJSON,
    });
    // .then((response) => {
    //     if (response.ok) {
    //         // Handle success response (e.g., redirect or show a success message)
    //         console.log('Login successful');
    //     } else {
    //         // Handle error response (e.g., show an error message)
    //         console.error('Login failed');
    //     }
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });
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
      <Button onClick={handleLogin}>LOG IN</Button>
    </Container>
  );
}

export default Login;
