import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 50px 100px 100px 100px;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica;
  background-color: #f0f3f8;
  gap: 30px;
`;

const ButtonContainer = styled.div`
  width: 62.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 10px;
`;

const JobLeadContainer = styled.div`
  display: flex-wrap;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: auto;
  background-color: white;
  margin: 10px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: 400;
  float: left;
  padding-left: 16px;
`;

const H1 = styled.h1`
  font-size: 34px;
  font-weight: 500;
  align-self: flex-start;
  padding-left: 19%;
  margin-bottom: -15px;
`;

const Body = styled.body`
  font-size: 16px;
  font-weight: 400;
  align-self: flex-start;
  padding-left: 19%;
`;

const ButtonL = styled.button`
  width: 62.5%;
  padding: 16px;
  font-size: 20px;
  font-weight: 500;
  color: #3568e5;
  border-radius: 8px;
  border-width: 0px;
  background: var(--light-primary-shades-12-p, rgba(53, 104, 229, 0.12));
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='8' ry='8' stroke='%233568E5FF' stroke-width='4' stroke-dasharray='20%2c 10' stroke-dashoffset='2' stroke-linecap='butt'/%3e%3c/svg%3e");
`;

export { Container, ButtonContainer, JobLeadContainer, H3, H1, Body, ButtonL };
