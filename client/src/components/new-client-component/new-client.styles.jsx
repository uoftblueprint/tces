import styled from "styled-components";
import { Button } from "@mui/material";

const Form = styled.form`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  background-color: #f0f3f8;
  text-align: initial;
`;

const Header = styled.div`
  display: flex;
  width: 47.5rem;
  padding-right: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

const Discard = styled(Button)`
  margin-right: auto !important;
`;

const AddButton = styled(Button)`
  color: black;
  border: 2px dashed #2196f3;
  background-color: #e3f2fd;
`;

export { Form, Header, Discard, AddButton };
