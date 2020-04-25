import styled from '@emotion/styled';
import PropTypes from 'prop-types';

export const Group = styled.div`
  width: 200px;
  display: block;
  height: 60px;
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
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  padding: 10px;
`;

export const Image = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  transition: opacity 0.2s ease-in-out;
  border-radius: 4px;
  margin-right: 10px;

  opacity: ${({ imageLoaded }) => imageLoaded ? 1 : 0};
`;

Image.propTypes = {
  imageLoaded: PropTypes.bool,
};

export const Name = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 15px;
`;

export const Members = styled.div`
  font-size: 13px;
  color: #aaaaaa;
  margin-top: 2px;
`;

export const Info = styled.div`
  min-width: 0;
`;
