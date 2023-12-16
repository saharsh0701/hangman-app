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

const words = ["ackee", "acorn", "agave", "aioli", "ajvar", "amber", "amour", "anise", "apple", "apron", "aroma", "aspic", "bacon", "bagel", "baked", "baker", "bamba", "baron", "basil", "basin", "baste", "beefy", "berry", "bison", "blade", "blast", "blend", "bliss", "blitz", "blush", "board", "boils", "boned", "booze", "borax", "bowls", "brain", "bread", "bream", "brine", "broil", "broth", "brown", "bugle", "bunny", "butty", "cacao", "cajun", "camel", "candy", "caper", "capon", "carob", "carve", "cedar", "cepes", "chard", "chars", "cheek", "chick", "chile", "chili", "chill", "chino", "chive", "chops", "chuck", "chunk", "cider", "cling", "clove", "cocoa", "colby", "comal", "conch", "cooky", "cools", "copha", "coppa", "coral", "corer", "cover", "craft", "cream", "crema", "creme", "crepe", "cress", "crimp", "crisp", "crock", "crown", "crumb", "crush", "crust", "cumin", "curry", "cutup", "dairy", "dashi", "dices", "dilly", "discs", "divan", "dough", "drain", "dress", "dries", "drink", "drips", "droop", "drops", "dukka", "dulse", "farro", "feast", "fiber", "filet", "fills", "fizzy", "flake", "flaky", "flank", "flesh", "float", "flour", "foams", "foils", "fresh", "fries", "frost", "fruit", "fryer", "fudge", "gator", "glace", "glass", "glaze", "goose", "gourd", "grain", "grana", "grape", "grass", "grate", "gravy", "green", "grill", "grind", "groat", "guava", "gumbo", "gummy", "gusto", "gyoza", "hatch", "hazel", "heats", "honey", "hooch", "horno", "icing", "jelly", "jimmy", "juice", "juicy", "kaong", "kasha", "kashk", "kebab", "kefir", "khubz", "knead", "knife", "kokum", "kombu", "konbu", "koshi", "kraft", "kucai", "kudzu", "ladle", "lager", "lardo", "latik", "latte", "layer", "leafy", "lemon", "licor", "liner", "liver", "lolly", "lotus", "lunch", "mache", "maize", "mango", "matzo", "meaty", "melon", "melts", "meson", "milky", "mince", "mirin", "mixer", "mixes", "mocha", "moist", "moose", "morel", "mould", "mound", "myoga", "nashi", "navel", "niter", "nutty", "offal", "okara", "olive", "onion", "ovens", "paddy", "panko", "paper", "pasta", "pasty", "patis", "patty", "peach", "pecan", "peels", "pekoe", "penne", "perch", "pesto", "petal", "picks", "piece", "pilaf", "pimms", "pinch", "pipis", "pisco", "pitia", "pizza", "plate", "pluck", "Poach", "poppy", "pound", "prawn", "prick", "proof", "prune", "pulse", "punch", "puree", "quail", "quark", "ranch", "recao", "rinse", "roast", "rolls", "roqaq", "rouge", "sabra", "salad", "salsa", "salty", "samba", "sauce", "saute", "savor", "savoy", "scald", "scone", "scoop", "scrod", "scrub", "serve", "shake", "shank", "shark", "sheep", "sheet", "shell", "shoyu", "shred", "sieve", "skate", "skins", "skirt", "skunk", "slash", "slice", "slits", "smash", "smear", "smelt", "smoke", "smoky", "snack", "snail", "snaps", "snoek", "snook", "sopes", "speck", "spice", "spicy", "split", "spoon", "spray", "sprig", "squab", "squid", "stack", "stale", "stand", "steak", "steam", "steep", "stews", "stick", "stirs", "stock", "stout", "stove", "straw", "strip", "stuff", "sugar", "sumac", "sumaq", "sushi", "sweat", "swede", "sweet", "swirl", "swiss", "syrup", "tabil", "table", "tarry", "tasso", "taste", "tater", "tawny", "thaws", "thyme", "toast", "toddy", "tongs", "tonic", "torta", "tosss", "Trays", "tripe", "trout", "truss", "tucks", "vodka", "wafer", "wagon", "water", "wedge", "welsh", "wheat", "whips", "whirl", "whisk", "wilts", "wraps", "yucca", "zesty"];
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
    const firstRow = Array.from(alphabet.slice(0, 10));
    const secondRow = Array.from(alphabet.slice(10, 20));
    const thirdRow = Array.from(alphabet.slice(20, 26));
  
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
        <div className="button-row">{generateButtons(firstRow)}</div>
        <div className="button-row">{generateButtons(secondRow)}</div>
        <div className="button-row">{generateButtons(thirdRow)}</div>
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
