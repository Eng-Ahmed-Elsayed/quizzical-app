/* eslint-disable react/prop-types */
export default function Quiz(props) {
    const answers = props.allAnswers.map(ans => {
    return (
    <button className="answer-btn" key={ans.id}>{ans.answer}</button>
    )
})

    return (
        <div className="quiz">
            <div className="question-container">
                <h4 className="question">{props.question}</h4>
                <div className="answers">
                    {answers}
                    {/* <button className="answer-btn selected">Adiós</button>
                    <button className="answer-btn">Hola</button>
                    <button className="answer-btn">Au Revoir</button>
                    <button className="answer-btn">Salir</button> */}
                </div>
                <div className="hr"></div>
            </div>
            
        </div>
    )
}