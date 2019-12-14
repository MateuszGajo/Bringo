import React from "react";
import "./styles/wordSubmit.scss";
const WordSubmit = ({ handleSubmit, selectedWord, setTypedWord }) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="subtitle is-2 words">{selectedWord.pl}</h2>
      <input
        className="input"
        type="text"
        placeholder=""
        onChange={e => setTypedWord(e.target.value)}
        required
      ></input>
      <button className="button check">Sprawdź</button>
    </form>
  );
};

export default WordSubmit;
