import { useEffect, useState } from 'react';

import API from 'api';

export const useGroup = ownerId => {
  const [group, setGroup] = useState({ name: '' });

  useEffect(() => {
    if (ownerId > 0) {
      return;
    }

    // fetch groups
    API.groups.fetchGroupsById({ group_ids: [-ownerId] })
      .then(groups => {
        if (groups[0]) {
          setGroup(groups[0]);
        }
      })
      .catch(console.warn);
  }, [ownerId]);

  return group;
};

export const useUser = ownerId => {
  const [user, setUser] = useState({ first_name: '', last_name: '', id: 0 });

  useEffect(() => {
    if (ownerId <= 0) {
      return;
    }

    // fetch groups
    API.users.fetchUsers({ user_ids: [ownerId] })
      .then(users => {
        if (users[0]) {
          setUser(users[0]);
        }
      })
      .catch(console.warn);
  }, [ownerId]);

  return user;
};

export const useImageLoaded = imageSrc => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    let image = new Image();
    image.onload = () => {
      setImageLoaded(true);
    };
    image.src = imageSrc;

    return () => {
      image.src = null;
      image = null;
    };
  }, [imageSrc]);

  return imageLoaded;
};

export const useDocumentTitle = title => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};
