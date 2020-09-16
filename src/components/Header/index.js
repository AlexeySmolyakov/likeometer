import React from 'react';

import UserContext from 'context';
import logo from 'assets/likeometer2-02-02-05.svg';
import * as Styled from './styled';

const Header = () => (
  <Styled.Header>
    <Styled.Logo src={logo} alt="Likeometer" />

    <UserContext.Consumer>
      {user => user && (
        <Styled.User>
          <span>{user.first_name || user.last_name}</span>
          <div style={{ backgroundImage: `url(${user.photo_200_orig})` }} />
        </Styled.User>
      )}
    </UserContext.Consumer>
  </Styled.Header>
);

export default Header;
