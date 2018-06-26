import React, { Component, createRef } from 'react'
import { newQuiz } from '../firebase'

class NoAnswerQuestion extends Component {
  state = {
    showSubmitForm: false,
    submitted: false,
    loading: false,
    error: null
  }

  submitQuiz = () => {
    const { question } = this.props.question
    const answer = this.answerInputRef.current.value

    if (answer) {
      this.setState({ loading: true, error: null })
      newQuiz({ question, answer: this.answerInputRef.current.value })
        .then(() => {
          this.setState({ submitted: true, loading: false })
        })
        .catch(error => this.setState({ loading: false, error: error.message }))
    }
  }

  generateSubmitForm = () => {
    const { loading, error } = this.state
    const { question } = this.props.question

    return (
      <li className="list-group-item">
        <h5 className='text-primary mb-2'>{question}</h5>
        <form>
          <div className="form-row mb-2">
            <input
              id="answerInput"
              type="text"
              className="form-control form-control-sm"
              aria-describedby="answerInputHelp"
              placeholder="Câu trả lời..."
              ref={this.answerInputRef} />
            <small id="answerInputHelp" className="form-text text-muted">
              Hãy chắc chắn rằng câu trả lời của bạn là chính xác!
            </small>
          </div>
          <div className="form-row justify-content-end">
          <button
            type="button"
            className="btn btn-secondary btn-sm mb-2 mr-sm-2"
            disabled={loading}
            onClick={() => this.setState({ showSubmitForm: false })}>
            Đóng
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm mb-2"
            disabled={loading}
            onClick={this.submitQuiz}>Cập nhật
          </button>
          </div>
        </form>
        {error && <small className="text-danger">Lỗi: {error}! Bạn vui lòng thử lại sau.</small>}
      </li>
    )
  }

  generateNoAnswerQuestion = () => {
    const { question } = this.props.question
    console.log(this.props)

    return (
      <li className="list-group-item">
        <h5 className='text-primary mb-1'>{question}</h5>
        <p className='text-danger mb-1 d-inline'>Câu hỏi này chưa có đáp án! Bạn có thể</p>
        <button type="button" className="btn btn-link btn-sm d-inline align-baseline px-1"
                onClick={() => this.setState({ showSubmitForm: true })}>cập nhật đáp án
        </button>
        <p className='text-danger mb-1 d-inline'>cho câu hỏi này.</p>
      </li>
    )
  }

  generateSubmittedQuestion = () => {
    const { question } = this.props.question

    return (
      <li className="list-group-item">
        <h5 className='text-primary mb-1'>{question}</h5>
        <p className='text-success d-inline'>Cảm ơn bạn đã đóng góp câu trả lời. Chúc bạn chơi <b>Blade & Soul</b> vui
          vẻ :D</p>
      </li>
    )
  }

  constructor(props) {
    super(props)
    this.answerInputRef = createRef()
  }

  render() {
    const { submitted, showSubmitForm } = this.state

    if (showSubmitForm && !submitted) {
      return this.generateSubmitForm()
    } else if (submitted) {
      return this.generateSubmittedQuestion()
    } else {
      return this.generateNoAnswerQuestion()
    }
  }
}

export default NoAnswerQuestion
