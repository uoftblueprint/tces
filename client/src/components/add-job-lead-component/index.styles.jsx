import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 100px;
  flex-direction: column;
  align-items: center;
  font-family: Helvetica;
  background-color: #f0f3f8;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  width: 62%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
  margin-bottom: 16px;
`;

const Body = styled.body`
  font-size: 16px;
  font-weight: 400;
  align-self: flex-start;
  padding-left: 19%;
  margin-bottom: 20px;
`;

const ButtonL = styled.button`
  width: 62%;
  margin: 10px;
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: #3568e5;
  border-radius: 8px;
  border: 2px dashed var(--light-primary-main, #3568e5);
  background: var(--light-primary-shades-12-p, rgba(53, 104, 229, 0.12));
`;

export { Container, ButtonContainer, JobLeadContainer, H3, H1, Body, ButtonL };
