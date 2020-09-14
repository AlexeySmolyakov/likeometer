import styled from '@emotion/styled';

export const Viewer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 0;
  position: absolute;
  background-color: rgba(0,0,0,0.8);
`;

export const Image = styled.img`
  max-width: 100vw;
  max-height: 100vh;
  z-index: 120;
  position: relative;
`;
