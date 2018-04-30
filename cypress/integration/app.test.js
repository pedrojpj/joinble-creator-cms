/* eslint-disable */
const faker = require('faker');

describe('App Page', () => {
  const fakerApp = {};

  before(() => {
    fakerApp.name = faker.name.title();
    fakerApp.domain = faker.internet.domainName();
  });

  beforeEach(() => {
    cy.visit(Cypress.env('URL_TEST'));
    cy.viewport('macbook-15');

    cy.get('input[name="email"]').type(Cypress.env('USER_EMAIL'));
    cy.get('input[name="password"]').type(Cypress.env('USER_PASSWORD'));
    cy.get('button[type="submit"]').click();
  });

  it('should create an application', () => {
    cy.get('#link-app').click();
    cy.get('#button-new-app').click();

    cy.get('input[name="name"]').type(fakerApp.name);

    cy
      .get('#combo-platforms')
      .find('div')
      .first()
      .click();

    cy
      .get('#combo-platforms')
      .find('div')
      .first()
      .next()
      .click();

    cy
      .get('#combo-languages')
      .find('div')
      .first()
      .click();

    cy.get('input[name="domain"]').type(fakerApp.domain);

    cy.get('#button-save').click();

    cy
      .get('#app-list')
      .children()
      .find('h4')
      .should('contain', fakerApp.name);
  });

  it('should delete an application', () => {
    cy.get('#link-app').click();

    cy
      .get('#app-list')
      .children()
      .then($elements => {
        const numberElements = $elements.length;

        cy
          .get('#app-list')
          .children()
          .first()
          .next()
          .find('button[aria-label="delete"]')
          .click();

        cy.get('#button-modal-accept').click();

        cy.wait(3000);

        cy
          .get('#app-list')
          .children()
          .then($elements => {
            expect($elements).to.have.length(numberElements - 1);
          });
      });
  });

  it('should edit an application', () => {
    cy.get('#link-app').click();

    cy
      .get('#app-list')
      .children()
      .first()
      .next()
      .as('app')
      .find('h4')
      .then($h4 => {
        const nameApp = $h4.text();

        cy
          .get('@app')
          .find('button[aria-label="edit"]')
          .click();

        const newNameApp = faker.name.title();

        cy.get('input[name="name"]').clear();
        cy.get('input[name="name"]').type(newNameApp);

        cy.get('#button-save').click();

        cy
          .get('@app')
          .find('h4')
          .should('contain', newNameApp);
      });
  });
});
