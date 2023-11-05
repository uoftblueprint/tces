import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const TimelineIconContainer = styled(Box)`
  position: relative;
  margin-right: 10px;
`;

const CircleContainer = styled(Box)`
  border-radius: 50%;
  background-color: green;
  color: white;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
`;

const Line = styled(Box)`
  position: absolute;
  top: 7px;
  left: 50%;
  height: 30px;
  width: 2px;
  background-color: #0000001f;
  transform: translate(-50%, 0%);
`;

export { TimelineIconContainer, CircleContainer, Line };
