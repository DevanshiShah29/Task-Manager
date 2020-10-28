import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/index";

if (localStorage.getItem("myTasksToken") == null)
  localStorage.setItem("myTasksToken", JSON.stringify([]));

const initialState = {
  list: JSON.parse(localStorage.getItem("myTasksToken")),
  currentIndex: -1,
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
console.log(store, "store");
console.log(initialState);

export default store;
