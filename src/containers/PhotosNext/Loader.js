import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Spinner = styled.div`
  margin: 10px auto 20px auto;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: inline-block;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 3px solid rgba(0, 0, 0, 0.05);
  border-right: 3px solid rgba(0, 0, 0, 0.05);
  border-bottom: 3px solid rgba(0, 0, 0, 0.05);
  border-left: 3px solid #accbee;
  transform: translateZ(0);
  animation: load8 1.1s infinite linear;

  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loader;
