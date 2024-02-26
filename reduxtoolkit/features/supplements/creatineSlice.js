const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  stockCreatine: 10,
};

const creatineSlice = createSlice({
  name: "creatine",
  initialState,
  reducers: {
    ordered: (state) => {
      state.stockCreatine--;
    },
    restock: (state, action) => {
      state.stockCreatine += action.payload;
    },
  },
});

module.exports = creatineSlice;
