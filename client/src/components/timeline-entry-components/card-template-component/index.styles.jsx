import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  height: fit-content;
  align-items: stretch;
  border: 1px solid #0000001f;
  padding: 16px;
  background: #fff;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
`;

const Line = styled.div`
  width: 1px;
  height: 100%;
  background-color: #0000001f;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
`;

const DateText = styled.div`
  color: var(--Light-Text-Secondary, rgba(0, 0, 0, 0.6));
  font-size: 6px;
`;

const Body = styled.p`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  margin-top: 8px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.expanded ? "none" : "4")};
  -webkit-box-orient: vertical;
  transition: max-height 0.3s ease;
`;

export {
  Card,
  ImageContainer,
  Image,
  Line,
  ContentContainer,
  Header,
  Title,
  DateText,
  Body,
};
