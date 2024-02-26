import "./App.css";

import ProteinView from "./features/protein/ProteinView";
import CreatineView from "./features/creatine/CreatineView";
import UserView from "./features/user/UserView";
function App() {
  return (
    <div>
      <ProteinView />
      <CreatineView />
      <UserView />
    </div>
  );
}

export default App;
