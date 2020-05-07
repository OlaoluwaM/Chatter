describe('Cypress', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('is working', () => {
    cy.get('button').click();

    cy.get('form').should('be.visible');
  });
});
