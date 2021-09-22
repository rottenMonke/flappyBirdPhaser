import React from "react";
import ReactDOM from "react-dom";
import { GameContextProvider } from "./context/GameContext";
import "./Game";  
import UI from "./UI";


function App() {
  return (
    <GameContextProvider>
      <UI />
    </GameContextProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
