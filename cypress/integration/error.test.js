/* eslint-disable */

const promise = Cypress.Promise;

describe('Error', () => {
  beforeEach(() => {
    cy.server();

    cy.visit(Cypress.env('URL_TEST'), {
      onBeforeLoad(win) {
        cy
          .stub(win, 'fetch')
          .as('fetch')
          .returns(promise.reject());
      }
    });
    cy.viewport('macbook-15');
  });

  it('should display a connection failure type 503 error', () => {
    cy.get('h1').should('contain', '503');
  });
});
