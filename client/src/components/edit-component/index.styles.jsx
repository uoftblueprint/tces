import styled from "styled-components";

import {
  Box,
  TextField,
  Stack,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";

const Form = styled.div`
    height: "100vh";
    display: "flex";
    flex - direction: "column";
    align - items: "center";
    justify - content: "center";
    font - family: "Helvetica";
    background - color: "#f0f3f8";
`;

const Header = styled(Box)`
    display: "flex";
    width: "47.5rem";
    padding - right: "0px";
    flex - direction: "column";
    align - items: "flex-start";
    gap: "0.625rem";
`;

const Cancel = styled(Button)`
  margin-right: "auto";
`;

export {
  TextField,
  Stack,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Form,
  Header,
  Cancel,
};
