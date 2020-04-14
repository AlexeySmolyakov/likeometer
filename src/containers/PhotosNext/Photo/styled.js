import styled from '@emotion/styled';

export const Photo = styled.div`
  width: 260px;
  display: block;
  height: 200px;
  padding: 10px;
  flex-grow: 1;
  position: relative;

  &:empty {
    padding: 0;
    height: 0;
  }
`;

export const Panel = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`;
