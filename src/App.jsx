import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import {decode} from 'html-entities';


import Intro from './components/Intro'
import Quiz from './components/Quiz'

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [checkAnswers, setCheckAnswers] = useState(false)
  const [quizData, setQuizData] = useState([])
  const quiz = quizData.map(q => {
    return (
      <Quiz
      key={q.id}
      allAnswers={q.allAnswers}
      correct_answer={decode(q.correct_answer)}
      question={decode(q.question)}
      />
    )
  })
  function handelStartQuiz() {
    setStartQuiz(true)
  }

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5')
      .then(response => response.json())
      .then(json => setQuizData(json.results.map(data => (
        {
          ...data,
          id: nanoid(),
          allAnswers: [...data.incorrect_answers, data.correct_answer]
          .sort((a, b) => 0.5 - Math.random())
          .map(ans => ({
            answer: decode(ans), 
            id: nanoid(), 
            selected: false}))
        }))))
      .catch(error => console.error(error));
  }, [])

  useEffect(() => {
    console.log(quizData)
  }, [quizData])

  return (
    <div className="container">
      <div className="top-blob">
      </div>
      <div className="">
        {!startQuiz && <Intro startQuiz={handelStartQuiz} />}
        {startQuiz && !checkAnswers && quiz}
        {startQuiz && !checkAnswers && <button className="check-answers">Check Answers</button>}
      </div>
      <div className="bottom-blob">
      </div>
    </div>
  )
}

export default App
