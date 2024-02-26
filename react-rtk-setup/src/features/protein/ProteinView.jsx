import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import proteinSlice from "./proteinSlice";

const {
  actions: { ordered, restocked },
} = proteinSlice;

const ProteinView = () => {
  const stockEvolene = useSelector((state) => state.protein.stockEvolene);
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>Stock Whey Evolene - {stockEvolene}</h2>
      <button
        onClick={() => {
          dispatch(ordered(2));
        }}
      >
        Order Evolene
      </button>
      <p>Jumlah barang masuk:</p>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        style={{ padding: 10, borderRadius: 15 }}
      />
      <button
        onClick={() => {
          dispatch(restocked(value));
        }}
      >
        Restock Evolene
      </button>
    </div>
  );
};

export default ProteinView;
