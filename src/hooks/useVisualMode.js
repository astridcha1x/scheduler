import { useState } from "react";



export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {

    setHistory(prev => {
    
    const newHistory = [...prev]

    if (replace) {
      // newHistory.pop();
      return [...prev.slice(0, prev.length - 1), newMode];
    }
    
    // newHistory.push(newMode);
    // return newHistory;

    return [...prev, newMode];

    });

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