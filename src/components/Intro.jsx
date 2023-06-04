/* eslint-disable react/prop-types */
export default function Intro(props) {
    return(
        <main className="main-intro">
            <h1 className="intro-head">Quizzical</h1>
            <p className="intro-text">Some description if needed</p>
            <button className="start-btn" onClick={props.startQuiz}>Start quiz</button>
        </main>
    )
}