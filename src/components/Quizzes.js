import React from 'react'
import NoAnswerQuestion from './NoAnswerQuestion'

function parseDebugUrl(quiz) {
  return `https://console.firebase.google.com/project/dovui-bns/database/firestore/data~2Fquizzes~2F${quiz.id}`
}

const Question = ({ quiz, debug }) => (
  <li className="list-group-item">
    <div className="d-flex justify-content-between">
      <h5 className='text-primary mb-1'>{quiz.question}</h5>
      {debug && <a className="text-black-50" href={parseDebugUrl(quiz)} target="_blank">{quiz.id}</a>}
    </div>
    <p className='text-secondary mb-1'>{quiz.answer}</p>
  </li>
)

const Quizzes = ({ questions, quizzes, debug }) => (
  <ul className="list-group mt-5">
    {
      questions.map((question, index) => {
        const quiz = quizzes.find(q => q.lower_question === question.question.toLowerCase())

        if (quiz) {
          return <Question key={index} quiz={quiz} debug={debug} />
        } else {
          return <NoAnswerQuestion key={index} question={question} />
        }
      })
    }
  </ul>
)

export default Quizzes
