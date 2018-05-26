import React, { Component, createRef } from 'react'
import Quizzes from './components/Quizzes'
import { getQuizzes } from './firebase'
import { extractQuestion } from './utils'

const instruction = `1. Mở trang https://dovui.bns.garena.vn và đăng nhập tài khoản của bạn
2. Nhấn Ctrl + A sau đó nhấn Ctrl + C để copy toàn bộ nội dung của trang đố vui
3. Nhấn Ctrl + V để copy nội dung vào khung này sau đó nhấn nút "Lấy câu trả lời"

Bạn không cần phải copy từng câu hỏi, bạn chỉ cần copy toàn bộ nội dung trên trang web.`

class App extends Component {
  state = {
    questions: [],
    quizzes: [],
    loading: false,
    error: null,
    debug: false
  }

  sendQuestions = () => {
    const questionsString = this.questionsRef.current.value.trim()

    if (questionsString.length) {
      this.setState({ loading: true, error: null, questions: [], quizzes: [] })
      const questions = extractQuestion(questionsString)

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

  constructor(props) {
    super(props)
    this.questionsRef = createRef()
  }

  render() {
    const { questions, quizzes, loading, error, debug } = this.state

    return (
      <div className="w-50 mx-auto pt-5">
        <div className="input-group">
          <textarea
            className="form-control rounded-0"
            aria-label="Questions"
            rows={10}
            ref={this.questionsRef}
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
              disabled={loading}
              onClick={this.sendQuestions}>Lấy câu trả lời
            </button>
          </form>
        </nav>
        <Quizzes debug={debug} questions={questions} quizzes={quizzes} />
        {error && <h5 className="text-danger text-center">Lỗi: {error}! Bạn vui lòng thử lại sau.</h5>}
        {loading && <div className="loader mx-auto" />}
      </div>
    )
  }
}

export default App
