/* eslint-disable */
const faker = require('faker');

let fakeUser;

describe('User', () => {
  before(() => {
    fakeUser = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      address: faker.address.streetAddress(),
      country: faker.address.countryCode(),
      city: faker.address.city(),
      password: faker.internet.password()
    };
  });

  beforeEach(() => {
    cy.visit(Cypress.env('URL_TEST'));
    cy.viewport('macbook-15');
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

    cy.get('input[name="email"]').type(fakeUser.email);
    cy.get('button[type="submit"]').click();

    cy.get('.alert-info').should('exist');
  });

  it('should logged the user', () => {
    cy.get('input[name="email"]').type(fakeUser.email);
    cy.get('input[name="password"]').type(fakeUser.password);
    cy.get('button[type="submit"]').click();

    cy.get('.alert-info').should('contain', fakeUser.name);
  });

  it('should update your user profile', () => {
    cy.get('input[name="email"]').type(fakeUser.email);
    cy.get('input[name="password"]').type(fakeUser.password);
    cy.get('button[type="submit"]').click();

    cy.wait(3100);

    cy.get('#username').click();
    cy.get('#profile').click();

    const newData = {
      address: faker.address.streetAddress(),
      country: faker.address.countryCode(),
      city: faker.address.city()
    };

    cy.get('input[name="address"]').clear();
    cy.get('input[name="address"]').type(newData.address);
    cy.get('select[name="country"]').select(newData.country);

    cy.get('input[name="city"]').clear();
    cy.get('input[name="city"]').type(newData.city);

    cy.get('button[type="submit"]').click();

    cy.get('input[name="address"]').should('have.value', newData.address);
  });
});
