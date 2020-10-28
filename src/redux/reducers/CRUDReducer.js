const initialState = {
  list: JSON.parse(localStorage.getItem("myTasksToken")),
  currentIndex: -1,
};

const CRUDReducer = (state = initialState, action) => {
  console.log(state.list, "state.list inside reducer", state.currentIndex);
  switch (action.type) {
    case "INSERT":
      state.list.push(action.payload);
      localStorage.setItem("myTasksToken", JSON.stringify(state.list));
      state.currentIndex = -1;
      return { ...state };

    case "UPDATE":
      state.list[state.currentIndex] = action.payload;
      localStorage.setItem("myTasksToken", JSON.stringify(state.list));
      state.currentIndex = -1;
      return { ...state };

    case "DELETE":
      if (window.confirm("Are you sure you want to delete this task?")) {
        state.list.splice(action.payload, 1);
        console.log(action.payload, "mmm");
        localStorage.setItem("myTasksToken", JSON.stringify(state.list));
        state.currentIndex = -1;
        return state.list;
      } else {
        localStorage.setItem("myTasksToken", JSON.stringify(state.list));
        state.currentIndex = -1;
        return { ...state };
      }
    case "UPDATE-INDEX":
      state.currentIndex = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default CRUDReducer;
