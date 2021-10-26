function Reducer(state=[], action){
  if(action.type == 'ADD_TODO') {
    return state.concat([action.todo])
  }

  return state
}

function createStore(){
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

  return {
    getState,
    subscribe
  }

}

const store = createStore();

store.subscribe(()=> {
  console.log("The new State", store.getState());
})

const unsubscribe = store.subscribe(()=> {
  console.log("The state changed");
})

unsubscribe();