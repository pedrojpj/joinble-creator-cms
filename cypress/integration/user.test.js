/* eslint-disable */
const faker = require('faker');

let fakeUser;

describe('User', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('URL_TEST'));
    cy.viewport('macbook-15');

    fakeUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      country: faker.address.countryCode(),
      city: faker.address.city(),
      password: faker.internet.password()
    };
  });

  it('should create a user', () => {
    cy.get('#create-user').click();
    cy.get('input[name="name"]').type(fakeUser.name);
    cy.get('input[name="email"]').type(fakeUser.email);
    cy.get('input[name="address"]').type(fakeUser.address);
    cy.get('select[name="country"]').select(fakeUser.country);
    cy.get('input[name="city"]').type(fakeUser.city);
    cy.get('input[name="password"]').type(fakeUser.password);
    cy.get('input[name="conditions"]').click();

    cy.get('button[type="submit"]').click();

    cy.get('#username').should($span => {
      expect($span.text()).to.contain(fakeUser.name);
    });
  });

  it('should send email to reset password', () => {
    cy.get('#forgotten-password').click();

    cy.get('input[name="email"]').type('example@example.com');
    cy.get('button[type="submit"]').click();

    cy.get('.alert-info').should('exist');
  });
});
