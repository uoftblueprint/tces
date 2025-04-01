import styled from "styled-components";

const DashboardContainer = styled.div`
  margin-right: 40px;
  overflow: "auto";
  background-color: #fafafa;
  height: 100vh;
  width: 100vw;
  position: relative;
  z-index: -1;
`;

const HeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
`;

const JobPostContainer = styled.div`
  display: flex-wrap;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: auto;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 400;
  float: left;
  padding-left: 16px;
`;

const ButtonL = styled.button`
  width: 100%;
  padding: 16px;
  font-size: 20px;
  font-weight: 500;
  color: #3568e5;
  border-radius: 8px;
  cursor: pointer;
  border-width: 0px;
  margin-top: 16px;
  margin-bottom: 16px;
  background: var(--light-primary-shades-12-p, rgba(53, 104, 229, 0.12));
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%233568E5FF' stroke-width='4' stroke-dasharray='20%2c 10' stroke-dashoffset='2' stroke-linecap='butt'/%3e%3c/svg%3e");
`;

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 50px 100px 100px 100px;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica;
  background-color: #f0f3f8;
  gap: 30px;
`;
export {
  DashboardContainer,
  ButtonContainer,
  HeaderContainer,
  JobPostContainer,
  H3,
  ButtonL,
  Container,
};
