import styled from '@emotion/styled';

export const Album = styled.div`
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
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
  background-image: linear-gradient(-45deg, #accbee 0%, #e7f0fd 100%);
  cursor: pointer;
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

export const Info = styled.div`
  position: absolute;
  bottom: 12px;
  left: 15px;
  right: 15px;
  display: flex;
  align-items: flex-end;
`;

export const Title = styled.div`
  font-size: 14px;
  color: white;
  font-weight: 600;
  text-shadow: 0 0 12px rgba(0,0,0,0.8), 0 1px 0px rgba(0,0,0,0.1);
  line-height: normal;
  flex: 1;
`;

export const Size = styled.div`
  font-size: 14px;
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  text-shadow: 0 0 12px rgba(0,0,0,0.8), 0 1px 0px rgba(0,0,0,0.1);
  line-height: normal;
  margin-left: 20px;
`;
