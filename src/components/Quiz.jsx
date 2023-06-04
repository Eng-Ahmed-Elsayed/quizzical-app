/* eslint-disable react/prop-types */
export default function Quiz(props) {
  // change the btn class depends on the quizState and
  // if the btn is selected or not also if the 
  // answer is correct or not
  // 1-select && in check mode && correct  => green
  // 2-select && in check mode && wrong => red
  // 3-select and not in check mode => dark blue
  // 4-Default => gray
  function getClassName(ans, props) {
    let className;
    // Selected answer, quizState is check and user hit the correct answerd
    if (
      ans.selected &&
      props.quizState === "check" &&
      props.userAnswerdCorrect
    ) {
      className = "answer-btn correct";
    }
    // Selected answer, quizState is check and user hit the wrong answerd
    else if (
      ans.selected &&
      props.quizState === "check" &&
      !props.userAnswerdCorrect
    ) {
      className = "answer-btn wrong";
    }
    // Selected answer, quizState is start
    else if (ans.selected && props.quizState === "start") {
      className = "answer-btn selected";
    }
    // Default class before the user click any btn
    else {
      className = "answer-btn";
    }
    return className;
  }
  const answers = props.allAnswers.map((ans) => {
    return (
      <button
        className={getClassName(ans, props)}
        key={ans.ansId}
        onClick={() =>
          // Handel click on answers bts and disable it if
          // quizState is not start
          props.quizState === "start" &&
          props.toggleAnswer(props.qId, ans.ansId)
        }
      >
        {ans.answer}
      </button>
    );
  });

  return (
    <div className="quiz">
      <div className="question-container">
        <h4 className="question">{props.question}</h4>
        <div className="answers">{answers}</div>
        <div className="hr"></div>
      </div>
    </div>
  );
}
