import { useEffect, useState } from 'react';

import API from 'api';

/**
 * Returns group info.
 * @param {number} ownerId
 * @returns {Object}
 */
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

/**
 * Returns user info.
 * @param {number} ownerId
 * @returns {{last_name: string, id: number, first_name: string}}
 */
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

/**
 * Detects if image is loaded.
 * @param {string} imageSrc
 * @returns {boolean}
 */
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

/**
 * Changes document title.
 * @param {string} title
 */
export const useDocumentTitle = title => {
  useEffect(() => {
    document.title = `${title} - Likeometer`;
  }, [title]);
};
