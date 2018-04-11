import React from 'react'
import NoAnswerQuestion from './NoAnswerQuestion'

const Question = ({ quiz }) => (
  <li className="list-group-item">
    <h5 className='text-primary mb-1'>{quiz.question}</h5>
    <p className='text-secondary mb-1'>{quiz.answer}</p>
  </li>
)

const Quizzes = ({ questions, quizzes }) => (
  <ul className="list-group mt-5">
    {
      questions.map((question, index) => {
        const quiz = quizzes.find(q => q.lower_question === question.question.toLowerCase())

        if (quiz) {
          return <Question key={index} quiz={quiz} />
        } else {
          return <NoAnswerQuestion key={index} question={question} />
        }
      })
    }
  </ul>
)

export default Quizzes
