import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show } from './helpers/helpers';
import DarkMode from "./components/DarkMode/DarkMode";

import './App.css';

const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [clickedLetters, setClickedLetters] = useState(new Set());

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays 
    setCorrectLetters([]);
    setWrongLetters([]);
    setClickedLetters(new Set());

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  const handleLetterClick = (letter) => {
    console.log(`Clicked letter: ${letter}`);
    if (playable) {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          setCorrectLetters((currentLetters) => [...currentLetters, letter]);
        } else {
          show(setShowNotification);
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          setWrongLetters((currentLetters) => [...currentLetters, letter]);
        } else {
          show(setShowNotification);
        }
      }
    }
    setClickedLetters((prevClickedLetters) => new Set([...prevClickedLetters, letter]));
  };
  const generateAlphabetButtons = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const firstRow = Array.from(alphabet.slice(0, 13));
    const secondRow = Array.from(alphabet.slice(13));

    const generateButtons = (letters) =>
      letters.map((letter) => (
        <button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          disabled={
            clickedLetters.has(letter) ||
            correctLetters.includes(letter) ||
            wrongLetters.includes(letter)
          }
        >
          {letter}
        </button>
      ));

    return (
      <div className="alphabet-buttons">
        <div className="button-row">
          {generateButtons(firstRow)}
        </div>
        <div className="button-row">
          {generateButtons(secondRow)}
        </div>
      </div>
    );
  };

  return (
    <>
      <DarkMode/>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
      <div className="alphabet-buttons">
        {generateAlphabetButtons()}
      </div>
    </>
  );
}

export default App;
