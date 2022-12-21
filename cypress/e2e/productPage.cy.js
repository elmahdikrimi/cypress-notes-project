/// <reference types="cypress" />
import errorMessages from '../pages/errorMessages'

describe('',()=>{
    beforeEach(()=>{


      cy.visit('/infiniment-espresso')
      cy.intercept('GET','/ma_en/*').as('reqs')
   
            cy.on('uncaught:exception',(e, runnable)=>{
            console.log('error =>', e)
            console.log("runs", runnable)
            if(e.message.includes('Cannot read properties of undefined') || e.message.includes('Cannot convert undefined or null to object')){
              return false
            }
          }) 

            cy.on('uncaught:exception'),(e,runnable)=>{
              console.log('error=',e)
              console.log('runs',runnable)
              return false
            }
          
          
        //cy.get('.action.tocart.primary.list.pdpcart-btn').as('addToBagBtn')
        //cy.get('.qty-box__overlay-wrapper:visible').as('qtyBox')
        //cy.get('#_evidon-accept-button').as('acceptBtn')
        // cy.get('[data-ui-id="message-success"]').as('successMsg')
        // cy.get('span.counter-number:visible').as('counter')
    })

    it('Visit Product Page',()=>{
    //cy.wait('@reqs')
    cy.wait(5000)

    cy.get('.action.tocart.primary.list.pdpcart-btn').as('addToBagBtn')
    cy.get('#_evidon-accept-button').as('acceptBtn')

    cy.get('@acceptBtn').click()

    errorMessages.addToBagBtn()
    cy.get('@addToBag')
    .contains('Add to Bag')
    .click()

    cy.log('clicked')

    cy.get('.qty-box__overlay-wrapper:visible')
    .contains('li',9)
    .click()

    cy.get('[data-ui-id="message-success"]')
    .should('exist');

    cy.wait(3000)
    cy.get('span.counter-number:visible')
    .should('contain',9)

    cy.get('a.action.showcart')
    .click()

    cy.get('[data-role="product-item"]')
    .should('have.length',1)

    cy.get('#top-cart-btn-checkout')
    .click()
    
    cy.wait(10000)

    it('Checkout Page',()=>{
      cy.location('pathname').should('include','/checkout/#shipping')
    })
    


})    



})