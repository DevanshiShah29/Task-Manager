// const initialState = { 
//     list: JSON.parse(localStorage.getItem('tasksToken')),
//     currentIndex: -1
// };

const CRUDReducer = (state = '', action) => {
    var list = JSON.parse(localStorage.getItem('tasksToken'));
    console.log(list,"list inside reducer", state.currentIndex);
    switch (action.type) {
        
        case "INSERT":
            list.push(action.payload)
            localStorage.setItem('tasksToken', JSON.stringify(list))
            return { list, currentIndex: -1 } 

        case "UPDATE":
            list[state.currentIndex] = action.payload
            localStorage.setItem('tasksToken', JSON.stringify(list))
            return { list, currentIndex: -1 }

        case "DELETE":
            if (window.confirm("Are you sure you want to delete this task?")) {
                list.splice(action.payload , 1)
                localStorage.setItem('tasksToken', JSON.stringify(list))
                return { list, currentIndex: -1 }
            } else {
                localStorage.setItem('tasksToken', JSON.stringify(list))
                return { list, currentIndex: -1 }
            }
        case "UPDATE-INDEX":
            return { list, currentIndex: action.payload }

        default:
            return {
                ...state
            }
    }
}

export default CRUDReducer;