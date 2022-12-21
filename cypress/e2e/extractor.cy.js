/// <reference types="cypress" />

import extractorElement from '../pages/extractorElements'
describe('Coffee',() => {

    beforeEach(()=>{
        cy.visit('https://ma.buynespresso.com/ma_fr/cafe.html')
        extractorElement.getFlavorBox()
        extractorElement.getProductsObj()
    })

    it('Get Products Infos',()=>{
        cy.log(extractorElement.getName())
    })
    it('get urls',()=>{
        extractorElement.checkBoxVerification()
    })
})