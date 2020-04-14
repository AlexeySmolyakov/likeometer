import styled from '@emotion/styled';

export const Title = styled.h1`
  margin: 40px 0 20px;
  font-size: 50px;
  font-weight: 600;
  height: 62px;
  line-height: 62px;
  display: block;

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
