context('Quizzes', function() {
  beforeEach(function() {
    cy.visit('/')
  })

  describe('Get quizzes', function() {
    it('should get answers from the input questions (type 1)', function() {
      cy.fixture('quizzes_type_1.txt').then(function(questions) {
        cy.get('.form-control').invoke('val', questions).trigger('change').type('{enter}')
      })

      cy.get('.btn').contains('Lấy câu trả lời').click({ force: true })
      cy.get('.list-group .list-group-item').should('have.length', 5)
    })

    it('should get answers from the input questions (type 2)', function() {
      cy.fixture('quizzes_type_2.txt').then(function(questions) {
        cy.get('.form-control').invoke('val', questions).trigger('change').type('{enter}')
      })

      cy.get('.btn').contains('Lấy câu trả lời').click({ force: true })
      cy.get('.list-group .list-group-item').should('have.length', 5)
    })

    it('should display no answer component when the answer is not found', function() {
      cy.fixture('no_answer_quiz.txt').then(function(questions) {
        cy.get('.form-control').invoke('val', questions).trigger('change').type('{enter}')
      })

      cy.get('.btn').contains('Lấy câu trả lời').click({ force: true })

      cy.get('.list-group .list-group-item .text-danger')
        .contains('Câu hỏi này chưa có đáp án!')
        .should('have.length', 1)
    })

    it('should disable Get answers button when no answers in the text area', function() {
      cy.get('.btn').contains('Lấy câu trả lời').should('be.disabled')
    })

    it('should enable Get answers button when answers are filled out in the text area', function() {
      cy.get('.form-control').type('This is another question?')
      cy.get('.btn').contains('Lấy câu trả lời').should('be.enabled')
    })
  })
})
