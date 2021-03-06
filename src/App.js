import React, { Component, createRef } from 'react'
import QuestionLoaders from './components/QuestionLoaders'
import Quizzes from './components/Quizzes'
import { getQuizzes } from './firebase'
import { extractQuestion } from './utils'

const instruction = `1. Mở trang https://dovui.bns.garena.vn và đăng nhập tài khoản của bạn
2. Nhấn Ctrl + A sau đó nhấn Ctrl + C để copy toàn bộ nội dung của trang đố vui
3. Nhấn Ctrl + V để copy nội dung vào khung này sau đó nhấn nút "Lấy câu trả lời"

Bạn không cần phải copy từng câu hỏi, bạn chỉ cần copy toàn bộ nội dung trên trang web.`

class App extends Component {
  state = {
    quizzes: [],
    error: null,
    debug: false,
    questions: [],
    loading: false,
    numberQuestion: 5,
    emptyQuestions: true
  }

  sendQuestions = () => {
    const questionsString = this.questionsRef.current.value.trim()

    if (questionsString.length) {
      const questions = extractQuestion(questionsString)
      this.setState({
        loading: true,
        error: null,
        questions: [],
        quizzes: [],
        numberQuestion: questions.length
      })

      getQuizzes(questions)
        .then(({ data: quizzes }) => {
          this.setState({ questions, quizzes, loading: false })
        })
        .catch(error => this.setState({ loading: false, error: error.message }))
    }
  }

  toggleDebug = () => {
    this.setState({ debug: !this.state.debug })
  }

  handleQuestionsChange = () => {
    this.setState({ emptyQuestions: !this.questionsRef.current.value })
  }

  constructor(props) {
    super(props)
    this.questionsRef = createRef()
  }

  render() {
    const { questions, quizzes, loading, error, debug, numberQuestion, emptyQuestions } = this.state

    return (
      <div className="app-layout">
        <div className="input-group">
          <textarea
            className="form-control rounded-0"
            aria-label="Questions"
            rows={10}
            ref={this.questionsRef}
            onChange={this.handleQuestionsChange}
            placeholder={instruction} />
        </div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="form-check form-check-inline text-light">
            <input className="form-check-input" type="checkbox" id="debugCheck" value="debug"
                   checked={debug} onChange={this.toggleDebug} />
            <label className="form-check-label" htmlFor="debugCheck">Chế độ Debug</label>
          </div>
          <form className="form-inline ml-auto">
            <button
              className="btn btn-outline-light"
              type="button"
              disabled={loading || emptyQuestions}
              onClick={this.sendQuestions}>
              Lấy câu trả lời
            </button>
          </form>
        </nav>
        {
          loading ?
            <QuestionLoaders numberQuestion={numberQuestion} debug={debug} /> :
            <Quizzes debug={debug} questions={questions} quizzes={quizzes} />
        }
        {error && <h5 className="text-danger text-center">Lỗi: {error}! Bạn vui lòng thử lại sau.</h5>}
      </div>
    )
  }
}

export default App
