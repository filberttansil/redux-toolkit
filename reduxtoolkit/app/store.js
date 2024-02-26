const configureStore = require("@reduxjs/toolkit").configureStore;
const createLogger = require("redux-logger").createLogger;
const proteinSlice = require("../features/protein/proteinSlice");
const creatineSlice = require("../features/supplements/creatineSlice");
const userReducer = require("../features/user/userSlice");
const logger = createLogger();

const store = configureStore({
  reducer: {
    protein: proteinSlice.reducer,
    creatine: creatineSlice.reducer,
    // cara lain
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;
