import { Button } from "@mui/material";
import styled from "styled-components";

const NavigationContainer = styled.div`
  background-color: white;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
`;

const MainNavButton = styled(Button)`
  width: 100%;
  height: 80px;
  border-radius: 10px !important;
  background-color: white !important;
  color: black !important;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px !important;
  text-transform: none !important;
  justify-content: flex-start !important;
  padding-left: 70px !important;

  .MuiButton-startIcon {
    position: absolute;
    left: 16px;
    background-color: ${(props) => props.iconBackgroundColour || "black"};
    color: #0000008a;
    border-radius: 50%;
    padding: 15px;
  }
`;

export { NavigationContainer, MainNavButton };
