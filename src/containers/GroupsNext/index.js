import React, { useState, useEffect } from 'react';

import API from 'api';
import { useDocumentTitle } from 'helpers/hooks';
import { Title, Subtitle } from 'styles/common';
import { inflectionGroups } from 'helpers';
import * as Styled from './styled';
import Group from './Group';
import { Group as StyledGroup } from './Group/styled';

let GROUPS_STORAGE = null;

const GroupsNext = () => {
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
    <Styled.GroupsNext>
      <Title>Сообщества</Title>
      <Subtitle>{`${groups.count} ${inflectionGroups(groups.count)}`}</Subtitle>

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
    </Styled.GroupsNext>
  );
};

export default GroupsNext;
