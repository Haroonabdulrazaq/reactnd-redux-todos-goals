const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO= "TOGGLE_TODO";
const ADD_GOAL= "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// Action Creators
  const addTodoAction = (todo)=>{
    return {
     type: ADD_TODO,
      todo
    }
  }
  const removeTodoAction = (payload)=>{
    return {
     type: REMOVE_TODO,
     payload
    }
  }
  const toggleTodoAction = (payload)=>{
    return {
     type: TOGGLE_TODO,
     payload
    }
  }
  const addGoalAction = (goal)=>{
    return {
     type: ADD_GOAL,
      goal
    }
  }
  const removeGoalAction = (payload)=>{
    return {
     type: REMOVE_GOAL,
     payload
    }
  }



// App Code

function todos(state=[], action){
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      const newTodos = state.filter(todo => todo.id !== action.payload)
      return newTodos
    case TOGGLE_TODO:
      console.log("Toggling..")
      return state.map(todo => todo.id !== action.payload? todo : 
        Object.assign({}, todo, true));
    default:
      return state;
  }
}
  // Goal Reducer

  const goals =(state=[], action)=>{
    switch (action.type) {
      case ADD_GOAL:
        return state.concat([action.goal])
      case REMOVE_GOAL:
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

store.dispatch(addTodoAction({
  id: 0,
  name: "Learn Redux",
  completed: false,
}))

store.dispatch(addGoalAction({
  id: 0,
  name: "Become a developer",
  Time: 2021,
}))

store.dispatch(removeTodoAction(0))
store.dispatch(removeGoalAction(0))
store.dispatch(toggleTodoAction(0))

