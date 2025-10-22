import React, { useState } from "react";
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import "./App.css";

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app-container">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <Game />
      )}
    </div>
  );
};

export default App;
