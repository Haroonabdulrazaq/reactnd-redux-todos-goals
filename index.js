// App Code

function todos(state=[], action){
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.todo])
    case "REMOVE_TODO":
      const newTodos = state.filter(todo => todo.id !== action.payload)
      return newTodos
    case "TOGGLE_TODO":
      return state.map(todo => todo.id !== action.payload? todo : 
        Object.assign({}, todo, {completed: !todo.completed }));
    default:
      return state;
  }
}
  // Goal Reducer

  const goals =(state=[], action)=>{
    switch (action.type) {
      case "ADD_GOAL":
        return state.concat([action.goal])
      case "REMOVE_GOAL":
        return state.filter((goal) => goal.id !== action.payload)
    
      default:
        return state;
    }
  }

const app =(state={}, action)=>{
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

// CreateStore function
function createStore(reducer){

  let state;
  let listeners = []

  getState=()=> state;

  subscribe=(listener)=> {
    listeners.push(listener)
    return() =>{
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  dispatch=(action)=>{
    state = reducer(state, action )
    listeners.forEach(listener => listener());
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}


const store = createStore(app);

store.subscribe(()=>{
  console.log("This is the new state:", store.getState());
})

store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    completed: false,
  }
})

store.dispatch({
  type: "ADD_GOAL",
  goal: {
    id: 0,
    name: "Become a developer",
    Time: false,
  }
})

store.dispatch({
  type: "REMOVE_TODO",
  payload: 2
})

store.dispatch({
  type: "REMOVE_GOAL",
  payload: 2
})

store.dispatch({
  type: "TOGGLE_TODO",
 payload: 2
})

