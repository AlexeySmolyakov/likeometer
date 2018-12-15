import { combineReducers } from 'redux';

//import user from './user';
import albums from './albums';
import photos from './photos';
import groups from './groups';
import friends from './friends';
import user from '../redux/user';

export default combineReducers({
  //user,
  albums,
  photos,
  groups,
  friends,
  user,
});