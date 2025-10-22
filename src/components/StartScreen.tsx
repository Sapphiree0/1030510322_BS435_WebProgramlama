import React from "react";
import "./StartScreen.css";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>AI Detect Game</h1>
      <p>
        Üç görsel arasından yapay zekâ tarafından üretilmiş olanı bulmaya çalış!
        Hazırsan hemen başla!
      </p>
      <button onClick={onStart}>Başla</button>
    </div>
  );
};

export default StartScreen;
