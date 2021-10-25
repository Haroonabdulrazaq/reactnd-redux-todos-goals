function createStore(){
  // The Store should have four(4) parts
  // Get State
  // Listens to changes on the State 
  //  update the State
  let state;
  getState=()=> state;
  return {
    getState
  }
}