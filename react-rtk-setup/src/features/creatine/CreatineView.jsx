import React from "react";
import { useSelector } from "react-redux";

const CreatineView = () => {
  const stockCreatine = useSelector((state) => state.creatine.stockCreatine);
  return (
    <div>
      <h2>Stock Creatine - {stockCreatine} </h2>
      <button>Order Creatine</button>
      <button>Restock Creatine</button>
    </div>
  );
};

export default CreatineView;
