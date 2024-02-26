const store = require("./app/store");
const proteinSlice = require("./features/protein/proteinSlice");
const creatineSlice = require("./features/supplements/creatineSlice");
const { actions: proteinActions } = proteinSlice;
const { actions: creatineActions } = creatineSlice;
const fetchUsers = require("./features/user/userSlice").fetchUsers;

// const unsubs = store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());

// store.dispatch(proteinActions.ordered());
// store.dispatch(proteinActions.ordered());
// store.dispatch(proteinActions.ordered());

// store.dispatch(creatineActions.ordered());
// store.dispatch(creatineActions.ordered());
// store.dispatch(creatineActions.ordered());

// unsubs();
