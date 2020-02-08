import styled from '@emotion/styled';

export const StyledAlbumNext = styled.div`
  //min-width: 240px;
  //max-width: 300px;
  //flex-grow: 1;
  width: 260px;
  height: 200px;
  padding: 10px;
  flex-grow: 1;
  position: relative;
  
  &:empty {
    padding: 0;
    height: 0;
  }
`;

export const ImageBackground = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`;

export const Title = styled.div`
  position: absolute;
  top: 18px;
  left: 20px;
  right: 20px;
  font-size: 14px;
  color: white;
  font-weight: 600;
  text-shadow: 0 0 12px rgba(0,0,0,0.8), 0 1px 0px rgba(0,0,0,0.1);
  line-height: normal;
`;