import { combineReducers } from 'redux';

import user from './user';
import albums from './albums';
import photos from './photos';
import groups from './groups';
import friends from './friends';
import userModule from '../redux/user';

export default combineReducers({
  user,
  albums,
  photos,
  groups,
  friends,
  userModule,
});