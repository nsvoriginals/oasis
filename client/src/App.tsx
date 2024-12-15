import React, { useState } from 'react';
import Start from './components/Start';
import Landing from './components/Landing';

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true); 
  };

  return (
    <>
      {gameStarted ? (
        <Start />
      ) : (
        <Landing onStart={handleStartGame} /> 
      )}
    </>
  );
};

export default App;
