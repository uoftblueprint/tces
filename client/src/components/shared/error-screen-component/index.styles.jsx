import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
`;

const ErrorMessage = styled.p`
  font-size: 20px;
  color: #ff0000;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export { BackButton, ErrorMessage, ErrorContainer };
