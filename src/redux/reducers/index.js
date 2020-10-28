import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import CRUDReducer from './CRUDReducer'

const rootReducer = combineReducers({
    CRUDReducer,
    form: formReducer,
});

export default rootReducer;