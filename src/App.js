import React, { Component, createRef } from 'react'
import Quizzes from './components/Quizzes'
import { getQuizzes } from './firebase'

const instruction = `1. Mở trang https://dovui.bns.garena.vn và đăng nhập tài khoản của bạn
2. Nhấn Ctrl + A sau đó nhấn Ctrl + C để copy toàn bộ nội dung của trang dovui
3. Paste vào khung này sau đó nhấn nút "Lấy câu trả lời"

Bạn không cần phải copy từng câu hỏi, bạn chỉ cần copy toàn bộ text trên trang web.`

class App extends Component {
  state = {
    questions: [],
    quizzes: [],
    loading: false,
    error: null
  }

  sendQuestions = () => {
    const questionsString = this.questionsRef.current.value.trim()

    if (questionsString.length) {
      this.setState({ loading: true, error: null, questions: [], quizzes: [] })
      const questions = questionsString
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.endsWith('?') === true)
        .map(question => ({ question }))

      getQuizzes(questions)
        .then(({ data: quizzes }) => {
          this.setState({ questions, quizzes, loading: false })
        })
        .catch(error => this.setState({ loading: false, error: error.message }))
    }
  }

  constructor(props) {
    super(props)
    this.questionsRef = createRef()
  }

  render() {
    const { questions, quizzes, loading, error } = this.state

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
          <form className="form-inline ml-auto">
            <button
              className="btn btn-outline-light"
              type="button"
              disabled={loading}
              onClick={this.sendQuestions}>Lấy câu trả lời
            </button>
          </form>
        </nav>
        <Quizzes questions={questions} quizzes={quizzes} />
        {error && <h5 className="text-danger text-center">{error}</h5>}
        {loading && <div className="loader mx-auto" />}
      </div>
    )
  }
}

export default App