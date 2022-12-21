/// <reference types="cypress" />

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given('Given user navigates to the website',()=>{
    cy.visit('https://twitter.com/i/flow/signup')
})
When('User clicks on Sign up button',()=>{
    cy.contains('Sign up with a phone number or email address')
})
When('User types username and password',(username,password)=>{
    cy.get('input#username').type(username)
    cy.get('input#password').type(password)
})
Then('Validate location',()=>{
    cy.url().should('include','homepage')
})