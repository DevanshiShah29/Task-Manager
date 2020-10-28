import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/index';

if (localStorage.getItem('tasksToken') == null)
    localStorage.setItem('tasksToken', JSON.stringify([]))

const initialState = {
    list: JSON.parse(localStorage.getItem('tasksToken')),
    currentIndex: -1
};

const middleware = [thunk];

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
console.log(store, "store");
console.log(initialState);

export default store;