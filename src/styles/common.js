import styled from '@emotion/styled';

export const Title = styled.h1`
  padding-top: 40px;
  margin: 0 0 20px;
  font-size: 50px;
  font-weight: 600;
  height: 62px;
  line-height: 62px;
  display: block;
  box-sizing: content-box;

  &:empty:after {
    content: '';
    width: 60%;
    height: 100%;
    background-color: #f7f7f7;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    display: block;
  }
`;

export const Subtitle = styled.div`
  color: lightgray;
  text-align: center;
  margin-top: -10px;
  margin-bottom: 10px;
`;
