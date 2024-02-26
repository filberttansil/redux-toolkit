// Untuk aplikasi react
// import redux from 'redux'
const redux = require("redux");
// Function redux untuk membuat store
const createStore = redux.createStore;
// Helper Function dari Redux
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
/*
Pembuatan Store 
*/

const initialCreatineState = {
  stokCreatine: 10,
};
const initialDadaAyamState = {
  stokDadaAyam: 20,
};

// ACTION CREATORS
const CREATINE_ORDERED = "CREATINE_ORDERED";
const CREATINE_RESTOCKED = "CREATINE_RESTOCKED";

const DADA_AYAM_ORDERED = "DADA_AYAM_ORDERED";
const DADA_AYAM_RESTOCKED = "DADA_AYAM_RESTOCKED";

// ACtion Creator untuk Creatine
function orderCreatine(qty = 1) {
  return {
    type: CREATINE_ORDERED,
    payload: qty,
  };
}
function restockCreatine(qty = 1) {
  return {
    type: CREATINE_RESTOCKED,
    payload: qty,
  };
}
// Action Creator untuk Dada Ayam
function orderDadaAyam(qty = 1) {
  return {
    type: DADA_AYAM_ORDERED,
    payload: qty,
  };
}
function restockDadaAyam(qty = 1) {
  return {
    type: DADA_AYAM_RESTOCKED,
    payload: qty,
  };
}

// REDUCERS
const creatineReducer = (state = initialCreatineState, action) => {
  switch (action.type) {
    case CREATINE_ORDERED:
      return {
        ...state,
        stokCreatine: state.stokCreatine - action.payload,
      };
    case CREATINE_RESTOCKED:
      return {
        ...state,
        stokCreatine: state.stokCreatine + action.payload,
      };
    // Default kita menreturn kembali state
    default:
      return state;
  }
};
const dadaAyamReducer = (state = initialDadaAyamState, action) => {
  switch (action.type) {
    case DADA_AYAM_ORDERED:
      return {
        ...state,
        stokDadaAyam: state.stokDadaAyam - action.payload,
      };
    case DADA_AYAM_RESTOCKED:
      return {
        ...state,
        stokDadaAyam: state.stokDadaAyam + action.payload,
      };
    // Default kita menreturn kembali state
    default:
      return state;
  }
};
// Variable rootReducer ini akan digunakan untuk function createStore nanti
const rootReducer = combineReducers({
  creatine: creatineReducer,
  dadaAyam: dadaAyamReducer,
});
// 1
/*
Single Reducer
const store = createStore(reducer);
*/
// Menerima 1 param jadi kita combine semua reducernya menggunakan combineReducer
const store = createStore(rootReducer);

// 2
console.log("Initial State", store.getState()); // Initial State { stokCreatine: 10 }
// 3
const unsubscribe = store.subscribe(
  () => console.log("Update state", store.getState())
  /*
  Update state { stokCreatine: 9 }
  Update state { stokCreatine: 8 }
  Update state { stokCreatine: 7 }    
  */
);

// Penggunaan tanpa bindActionCreators
// ORDER
store.dispatch(orderCreatine());
store.dispatch(orderCreatine());
store.dispatch(orderCreatine());

// RESTOCK
store.dispatch(restockCreatine(3));

// Penggunaan helper function bindActionCreators
const actions = bindActionCreators(
  { restockDadaAyam, orderDadaAyam },
  store.dispatch
);
actions.orderDadaAyam();
actions.orderDadaAyam();
actions.restockDadaAyam(3);

// 4
unsubscribe();
