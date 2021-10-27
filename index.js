// App Code

function todo(state=[], action){
  if(action.type == 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}
// CreateStore function
function createStore(todo){
  // The Store should have four(4) parts
  // Get State
  // Listens to changes on the State 
  //  update the State
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
    state = todo(state, action )
    listeners.forEach(listener => listener());
  }

  return {
    getState,
    subscribe,
    dispatch,
  }

}

const store = createStore(todo);

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

