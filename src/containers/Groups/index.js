import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import API from 'api';
import { useDocumentTitle } from 'helpers/hooks';
import { Title, Subtitle } from 'styles/common';
import { inflections } from 'helpers';
import Splitter from 'components/Splitter';
import * as Styled from './styled';
import Group from './Group';
import { Group as StyledGroup } from './Group/styled';

let GROUPS_STORAGE = null;

const Groups = () => {
  const [groups, setGroups] = useState({ count: 0, items: [] });

  useDocumentTitle('Сообщества');

  useEffect(() => {
    if (GROUPS_STORAGE) {
      setGroups(GROUPS_STORAGE);
    } else {
      API.groups.fetchGroups()
        .then(g => {
          const sortedGroups = g.items.sort((a, b) => b.members_count - a.members_count);
          setGroups({ ...g, items: sortedGroups });
          GROUPS_STORAGE = { ...g, items: sortedGroups };
        })
        .catch(console.warn);
    }
  }, []);

  return (
    <Styled.Groups>
      <Title>Сообщества</Title>
      <Subtitle>
        <Link to="/">Альбомы</Link>
        <Splitter />
        {`${groups.count} ${inflections.groups(groups.count)}`}
      </Subtitle>

      <Styled.Wrapper>
        {groups.items.map(group => <Group key={group.id} group={group} />)}
        <StyledGroup />
        <StyledGroup />
        <StyledGroup />
        <StyledGroup />
        <StyledGroup />
        <StyledGroup />
        <StyledGroup />
      </Styled.Wrapper>
    </Styled.Groups>
  );
};

export default Groups;
