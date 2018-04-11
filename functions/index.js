const admin = require('firebase-admin')
const functions = require('firebase-functions')

admin.initializeApp(functions.config().firebase)
const db = admin.firestore()

exports.getQuizzes = functions.https.onCall(data => {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  const quizzesRef = db.collection('quizzes')
  const quizzesPromise = data
    .map(({ question }) => quizzesRef.where('lower_question', '==', question.toLowerCase()).get())

  return Promise.all(quizzesPromise).then(quizzesQuery => {
    return quizzesQuery
      .filter(quizQuery => !quizQuery.empty)
      .map(quizQuery => {
        const quiz = quizQuery.docs[0]
        return Object.assign(quiz.data(), { id: quiz.id })
      })
  })
})

exports.newQuiz = functions.https.onCall(data => {
  if (data.question && data.answer) {
    return db.collection('quizzes').add({
      question: data.question,
      answer: data.answer
    })
  } else {
    throw new Error('Invalid question!')
  }
})

/**
 * Trigger to create lower_question whenever a quiz is added to database
 * @type {CloudFunction<DocumentSnapshot>}
 */
exports.createQuiz = functions
  .firestore
  .document('quizzes/{id}')
  .onCreate(snap => {
    const quiz = snap.data()
    snap.ref.update({ lower_question: quiz.question.toLowerCase() })
  })
