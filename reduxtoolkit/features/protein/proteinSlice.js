const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  stockEvolene: 10,
};

const proteinSlice = createSlice({
  name: "protein",
  initialState,
  reducers: {
    ordered: (state) => {
      state.stockEvolene--;
    },
    restocked: (state, action) => {
      state.stockEvolene += action.payload;
    },
  },
});

module.exports = proteinSlice;
