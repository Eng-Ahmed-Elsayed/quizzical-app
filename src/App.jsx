import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

import Intro from "./components/Intro";
import Quiz from "./components/Quiz";

function App() {
  // Our states 1-intro 2-start(quiz) 3-check(quiz) (Play again => Intro)
  // Intro display the intro page
  // start get the data from the api and start the quiz
  // check correct the exam then display the play again btn and the score
  const [quizState, setQuizState] = useState("intro");
  const [quizData, setQuizData] = useState([]);
  const [score, setScore] = useState(0);
  const quiz = quizData.map((q) => {
    return (
      <Quiz
        key={q.qId}
        qId={q.qId}
        allAnswers={q.allAnswers}
        correct_answer={decode(q.correct_answer)}
        question={decode(q.question)}
        toggleAnswer={toggleAnswer}
        userAnswerdCorrect={q.userAnswerdCorrect}
        quizState={quizState}
      />
    );
  });

  // Handel answers bts. When u click one answer
  // reverse selected state and set other ansers to false
  // so the use can only pick one answer
  function toggleAnswer(qId, ansId) {
    // First get the all the answers from the data by qustion id
    let answersList = quizData.filter((objQ) => objQ.qId === qId)[0].allAnswers;
    // Make the change
    answersList = answersList.map((ans) =>
      ans.ansId === ansId
        ? { ...ans, selected: !ans.selected }
        : { ...ans, selected: false }
    );
    // Set the new value
    setQuizData((data) =>
      data.map((objQ) =>
        objQ.qId === qId ? { ...objQ, allAnswers: answersList } : objQ
      )
    );
  }

  // Set The quizState intro => start
  function handelStartQuiz() {
    setQuizState("start");
  }

  // Handel what should happen when u click check answers btn
  // Check the answer if it is correct make it green and give +1,
  // else make it red and +0.
  // Then give the user his score and a chance to play again.
  function handelCheckAnswers() {
    setQuizData((data) =>
      data.map((objQ) => {
        const selectedAnswer = objQ.allAnswers?.filter(
          (ans) => ans.selected === true
        )[0];
        if (objQ.correct_answer === selectedAnswer?.answer) {
          setScore((prev) => prev + 0.5);
          return { ...objQ, userAnswerdCorrect: true };
        }
        return objQ;
      })
    );
    // Set The quizState start => check
    setQuizState("check");
  }

  function handelPlayAgain() {
    // Set The quizState check => intro
    setQuizState("intro");
    setScore(0);
    setQuizData([]);
  }

  // Get new data from the api. It will work when you click
  // the start btn (it changes quizState intro => start)
  // after this it will modify the json data (add new fields,
  // decode the data, etc) so we can use it in our quiz
  useEffect(() => {
    quizState === "start" &&
      fetch("https://opentdb.com/api.php?amount=5")
        .then((response) => response.json())
        .then((json) =>
          setQuizData(
            json.results.map((data) => ({
              ...data,
              qId: nanoid(),
              userAnswerdCorrect: false,
              // Adding new list of objs to carry all of the answers
              // with new fields and shuffle it.
              // Also decode the answer just in case
              allAnswers: [...data.incorrect_answers, data.correct_answer]
                // eslint-disable-next-line no-unused-vars
                .sort((a, b) => 0.5 - Math.random())
                .map((ans) => ({
                  answer: decode(ans),
                  // Add id for every answer
                  ansId: nanoid(),
                  selected: false,
                })),
            }))
          )
        )
        .catch((error) => console.error(error));
  }, [quizState]);

  return (
    <div className="container">
      {/* Top blob */}
      <div className="top-blob"></div>

      {/* Intro Page */}
      {quizState === "intro" && <Intro startQuiz={handelStartQuiz} />}

      {/* The loader */}
      {quizData.length === 0 && quizState === "start" && (
        <div className="loader"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
      )}

      {/* Quiz Page with Check Answers btn */}
      {quizState !== "intro" && quiz}
      {quizData.length > 0 && quizState === "start" && (
        <button className="check-answers" onClick={handelCheckAnswers}>
          Check Answers
        </button>
      )}

      {/* Quiz Page with Check Play again btn */}
      {quizData.length > 0 && quizState === "check" && (
        <div className="play-again-container">
          <h4 className="userScore">You scored {score}/5 correct answers</h4>
          <button className="play-again" onClick={handelPlayAgain}>
            Play again
          </button>
        </div>
      )}

      {/* Bottom blob */}
      <div className="bottom-blob"></div>
    </div>
  );
}

export default App;
