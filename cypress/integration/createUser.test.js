/* eslint-disable */
const faker = require('faker');

describe('Create User Page', () => {
  it('should create a user', () => {
    cy.visit(Cypress.env('URL_TEST'));
    cy.get('#create-user').click();

    const fakerUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      country: faker.address.countryCode(),
      city: faker.address.city(),
      password: faker.internet.password()
    };

    cy.get('input[name="name"]').type(fakerUser.name);
    cy.get('input[name="email"]').type(fakerUser.email);
    cy.get('input[name="address"]').type(fakerUser.address);
    cy.get('select[name="country"]').select(fakerUser.country);
    cy.get('input[name="city"]').type(fakerUser.city);
    cy.get('input[name="password"]').type(fakerUser.password);
    cy.get('input[name="conditions"]').click();

    cy.get('button[type="submit"]').click();

    cy.get('#username').should($span => {
      expect($span.text()).to.contain(fakerUser.name);
    });
  });
});
