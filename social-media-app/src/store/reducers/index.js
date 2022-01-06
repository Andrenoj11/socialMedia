import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { postReducer } from './postReducer';
import { albumReducer } from './albumReducer';

const reducers = combineReducers({
    userReducer,
    postReducer,
    albumReducer
});

export default reducers;