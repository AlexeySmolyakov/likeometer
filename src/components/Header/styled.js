import styled from '@emotion/styled';

export const Header = styled.header`
  max-width: 1500px;
  margin: auto;
  padding: 20px 20px 15px;
  display: flex;
  align-items: center;
`;

export const Logo = styled.img`
  height: 14px;
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  span {
    font-size: 13px;
    font-weight: 600;
  }

  div {
    border-radius: 50%;
    overflow: hidden;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background-color: #ccc;
    background-position: center center;
    background-size: cover;
  }
`;
