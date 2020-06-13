import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useImageLoaded } from 'helpers/hooks';
import * as Styled from './styled';

const Group = ({ group }) => {
  const { id, name, members_count, photo_50 } = group;

  const backgroundImage = `url(${photo_50})`;
  const imageLoaded = useImageLoaded(photo_50);
  const groupHref = `/albums-${id}`;

  return (
    <Styled.Group>
      <Link to={groupHref}>
        <Styled.Panel>
          <Styled.Image style={{ backgroundImage }} imageLoaded={imageLoaded} />
          <Styled.Info>
            <Styled.Name>{name}</Styled.Name>
            <Styled.Members>{(members_count || 0).toLocaleString()}</Styled.Members>
          </Styled.Info>
        </Styled.Panel>
      </Link>
    </Styled.Group>
  );
};

Group.propTypes = {
  group: PropTypes.shape({
    id: PropTypes.number,
    members_count: PropTypes.number,
    name: PropTypes.string,
    photo_100: PropTypes.string,
  }).isRequired,
};

export default Group;
