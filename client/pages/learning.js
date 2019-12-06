import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import {
  UPDATE_SESSION,
  UPDATE_SESSION_STATISTICS
} from "../features/mutations/updateSessionMutation";
import HomePage from "../features/components/Layout/HomePage";
import { isLogged, loadSession, scoreTable } from "../helper";
import WordSubmit from "../features/components/Learning/WordSubmit";
import StatusOfWordValidation from "../features/components/Learning/StatusOFWordValidation";
import DownBar from "../features/components/Learning/DownBar";
import "bulma";
import "./styles/reset.scss";
import "./styles/learning.scss";
import "./styles/customize.scss";

const learning = ({ words, userInfo, sessionInfo }) => {
  const {
    procentCorrectness: defaultPrcentCoretness,
    totalNumberOfWords: defaultTotalNumerOfWords,
    correctWords: defaultCorrectWords,
    discorrectWords: defaultDiscorrectWords,
    score: defaultScore
  } = sessionInfo.amounts;

  const [selectedWord, setChoosedWord] = useState(words[0]);
  const [typeWord, setTypedWord] = useState("");
  const [wordValidation, setWordValidation] = useState("");
  const [correctWords, setNumberOfCorrectWords] = useState(defaultCorrectWords);
  const [discorrectWords, setNumberOfDiscorrectWords] = useState(
    defaultDiscorrectWords
  );
  const [totalNumberOfWords, setTotalNumberOfWords] = useState(
    defaultTotalNumerOfWords
  );
  const [procentCorrectness, setProcentCorrectness] = useState(
    defaultPrcentCoretness
  );
  const [scoreLevel, setScoreLevel] = useState({ correct: 0, inCorrect: 0 });
  const [score, setScore] = useState(defaultScore);
  const [isCorrectWord, setStatusOfWord] = useState(false);
  const [isChecking, setStatusOfChecking] = useState(false);
  const [isSessionCompleted, setStatusOfSession] = useState(false);

  const [updateSession, { data }] = useMutation(UPDATE_SESSION);
  const [updateSessionStatistics, { isUpdatedSessionStatistics }] = useMutation(
    UPDATE_SESSION_STATISTICS
  );

  const handleSubmit = e => {
    e.preventDefault();

    setStatusOfChecking(true);
    setWordValidation(selectedWord);

    const usersWordToComapre = typeWord.trim().toLowerCase();
    const choosedwordToCompare = selectedWord.en.toLowerCase();
    let countProcentCorrectness;
    let newScore;

    if (usersWordToComapre === choosedwordToCompare) {
      countProcentCorrectness = Math.ceil(
        ((correctWords + 1) * 100) / (totalNumberOfWords + 1)
      );
      newScore = score + scoreLevel.correct;

      setNumberOfCorrectWords(correctWords + 1);
      setStatusOfWord(true);
      setScore(newScore);
      updateSession({
        variables: {
          word: selectedWord.en,
          userId: userInfo.id,
          correctWords: correctWords + 1,
          discorrectWords,
          totalNumberOfWords: totalNumberOfWords + 1,
          procentCorrectness: countProcentCorrectness,
          score: newScore
        }
      });
    } else {
      countProcentCorrectness = Math.ceil(
        (correctWords * 100) / (totalNumberOfWords + 1)
      );

      if (score - scoreLevel.inCorrect < 0) newScore = 0;
      else newScore = score - scoreLevel.inCorrect;

      setNumberOfDiscorrectWords(discorrectWords + 1);
      setStatusOfWord(false);
      setScore(newScore);

      updateSessionStatistics({
        variables: {
          userId: userInfo.id,
          correctWords,
          discorrectWords: discorrectWords + 1,
          totalNumberOfWords: totalNumberOfWords + 1,
          procentCorrectness: countProcentCorrectness,
          score: newScore
        }
      });
    }

    setProcentCorrectness(countProcentCorrectness);
    setTotalNumberOfWords(totalNumberOfWords + 1);
  };

  useEffect(() => {
    const scoreLevel = scoreTable(userInfo.difficulty);

    setScoreLevel({ correct: scoreLevel, inCorrect: scoreLevel / 2 });
  }, []);

  useEffect(() => {
    if (data) {
      const newWordsArray = data.updateSession.words;

      if (newWordsArray.length === 0) {
        return setStatusOfSession(true);
      }

      setChoosedWord(newWordsArray[0]);
    }
  }, [data]);

  return (
    <HomePage>
      {isChecking ? (
        <StatusOfWordValidation
          setStatusOfChecking={setStatusOfChecking}
          isCorrectWord={isCorrectWord}
          wordValidation={wordValidation}
          userId={userInfo.id}
          isSessionCompleted={isSessionCompleted}
        ></StatusOfWordValidation>
      ) : (
        <WordSubmit
          setTypedWord={setTypedWord}
          handleSubmit={handleSubmit}
          selectedWord={selectedWord}
        ></WordSubmit>
      )}
      <DownBar
        difficulty={userInfo.difficulty}
        procentCorrectness={procentCorrectness}
        score={score}
      ></DownBar>
    </HomePage>
  );
};

learning.getInitialProps = async ctx => {
  await isLogged(ctx, "/signin");
  return await loadSession(ctx);
};

export default learning;
