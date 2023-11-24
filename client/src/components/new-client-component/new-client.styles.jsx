import styled from "styled-components";
import { Button } from "@mui/material";

const Form = styled.form`
  min-height: 100vh;
  padding-top: 30px;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Inter;
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

const AddButton = styled.button`
  padding: 16px;
  font-size: 20px;
  font-weight: 500;
  color: #3568e5;
  border-radius: 8px;
  border-width: 0px;
  background: var(--light-primary-shades-12-p, rgba(53, 104, 229, 0.12));
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%233568E5FF' stroke-width='4' stroke-dasharray='20%2c 10' stroke-dashoffset='2' stroke-linecap='butt'/%3e%3c/svg%3e");
`;

export { Form, Header, Discard, AddButton };
