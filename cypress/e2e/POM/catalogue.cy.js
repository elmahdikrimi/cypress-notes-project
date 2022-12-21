import {
  acceptCookies,
  clickButton,
  clickCafeMenu, 
  getElement, 
  getHomePage, 
  itemsWrapperVisible,
  noLoader,
  qtyList,
} from "../../pages/homepage"

import catalogue, { clickOkButton } from "../../pages/catalogue"
import { catchError } from "../../pages/general"
import productData from "../../fixtures/example.json"
import errorMessages from "../../pages/errorMessages"

// import data from env
const productN=Cypress.env('productName')
const productQty=Cypress.env('productQty')

//import data from external json
const productNameJson = productData.productName
const prodQ=productData.productQty

describe('add from catalogue',()=>{
    beforeEach(()=>{
      catchError ()
      cy.restoreLocalStorage()
    })

    afterEach(()=>{
    cy.saveLocalStorage()
    })

    it.only('home page is visible',()=>{
      cy.visit('/')
      getHomePage()     
      qtyList(10)
      catalogue.waitPageLoader()
      cy.wait(10000)
    })

    it('Accept cookies',()=>{
      acceptCookies()
    })

    it('Navigate to Cafe Menu',()=>{
      clickCafeMenu()
    })

    it('Items should be visible',()=>{
      itemsWrapperVisible()
    })

    it('locate element by name',()=>{
      getElement(productN)
      noLoader()
    })
    
    it.skip('Quantity box should be visible:',()=>{

    })

    it('Add using OK button',()=>{
      catalogue.clickOkButton()
      noLoader()
      cy.wait(10000)
    })

    it('Success: Added to cart',()=>{
      errorMessages.successMsgVisible()
    })

    it('Failure: Invalid key',()=>{
      errorMessages.failureMsgVisible()
    })
})