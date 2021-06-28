// -------------------------------- //

import { useState } from "react";

// -------------------------------- //

export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {

    // react will rationalize the extra setState so no meaningful performance hit
    if (replace) {
      back();
    }

    setHistory(prev => ([...history, newMode]));

  };

  // go back to previous mode
  const back = () => {

    if (history.length < 2) {
      return;
    }

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop(); 
      return newHistory;
    }); // can use slice instead, however, was recommended that I keep this for simplicity sake

  };

  const mode = history.slice(-1)[0];

  return { mode, transition, back };

};