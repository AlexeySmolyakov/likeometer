import styled from '@emotion/styled';

export const Photo = styled.div`
  width: 260px;
  display: block;
  height: 200px;
  padding: 10px;
  flex-grow: 1;

  &:empty {
    padding: 0;
    height: 0;
  }
`;

export const Panel = styled.div`
  position: relative;
  height: 100%;
  border-radius: 4px;
  background-image: linear-gradient(-45deg, #accbee 0%, #e7f0fd 100%);
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`;

export const Image = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  transition: opacity 0.2s ease-in-out;
  border-radius: 4px;

  opacity: ${({ imageLoaded }) => imageLoaded ? 1 : 0};
`;

export const Icon = styled.img`
  height: 14px;
  width: auto;
  position: absolute;
  bottom: 12px;
  right: 15px;
  z-index: 100;
`;
