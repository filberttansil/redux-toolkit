import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import proteinSlice from "../features/protein/proteinSlice";
import creatineSlice from "../features/creatine/creatineSlice";
import userSlice from "../features/user/userSlice";

const logger = createLogger();

const store = configureStore({
  reducer: {
    protein: proteinSlice.reducer,
    creatine: creatineSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
