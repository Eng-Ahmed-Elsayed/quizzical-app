import { useState } from 'react'

import Intro from './components/Intro'
import Quiz from './components/Quiz'

function App() {
  const [startQuiz, setStartQuiz] = useState(false)
  const [checkAnswers, setCheckAnswers] = useState(false)
  // const quiz = 
  function handelStartQuiz() {
    setStartQuiz(true)
  }

  return (
    <div className="container">
      <div className="top-blob">
      </div>
      <div className="">
        {!startQuiz && <Intro startQuiz={handelStartQuiz} />}
        {startQuiz && !checkAnswers && <Quiz />}
      </div>
      <div className="bottom-blob">
      </div>
    </div>
  )
}

export default App
