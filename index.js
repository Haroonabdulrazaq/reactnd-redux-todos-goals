function createStore(reducer){
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
      listerners = listerners.filter((l) => l !== listener)
    }
  }

  dispatch=(action)=>{
    state = reducer(state, action )
    listerners.forEach(listener => listener());
  }

  return {
    getState,
    subscribe,
    dispatch,
  }

}

// App Code

function todo(state=[], action){
  if(action.type == 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}


const store = createStore(todos);
