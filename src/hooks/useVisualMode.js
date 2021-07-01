import { useState } from "react";



export default function useVisualMode(initial) {

  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace) => {

    setHistory(prev => {
    
    const newHistory = [...prev]

    if (replace) {
      return [...prev.slice(0, prev.length - 1), newMode];
    }

    return [...prev, newMode];

    });

  };

  const back = () => {

    if (history.length < 2) {
      return;
    }

    setHistory(prev => {
      const newHistory = [...prev];
      newHistory.pop(); 
      return newHistory;
    });

  };

  const mode = history.slice(-1)[0];

  return { mode, transition, back };

};