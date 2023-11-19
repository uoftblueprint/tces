import styled from "styled-components";

import { Box, Button, Stack } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Form = styled.form`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: Helvetica;
  background-color: #f0f3f8;
  text-align: initial;
`;

const Header = styled(Box)`
  display: flex;
  width: 47.5rem;
  padding-right: 0px;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.625rem;
`;

const Upload = styled(Stack)`
  display: flex;
  padding: 1.5rem 1rem;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  align-self: stretch;
  border-radius: 0.5rem;
  border: 2px dashed rgba(0, 0, 0, 0.12);
  background: #fff;
`;

const UploadIcon = styled(UploadFileIcon)`
  border-radius: 6rem;
  background: rgba(53, 104, 229, 0.12);
  padding: 0.5rem;
`;

const Cancel = styled(Button)`
  margin-right: auto !important;
`;

export { Form, Header, Upload, UploadIcon, Cancel };
