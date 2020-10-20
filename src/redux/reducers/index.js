import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
//import  * as CRUD from './CRUDReducer'
import CRUD from './CRUDReducer'

const rootReducer = combineReducers({
    list: CRUD,
    form: formReducer,
    currentIndex: -1
});

export default rootReducer;