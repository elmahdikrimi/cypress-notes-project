import exemple from "../fixtures/example.json"
const quantity = exemple.productQty;

export function getHomePage() {
    cy.get('header').should('be.visible')
    cy.get('footer').should('be.visible')
}


export function acceptCookies () {
    cy.get('[aria-label="Accept"]').click()
}

export function clickCafeMenu () {
    cy.get('li.nav-1').find('a').click()
}

export function itemsWrapperVisible () {
    cy.get('.item-wrapper').should('be.visible')
}

export function checkProductsSum () {
    cy.get('.item-wrapper')
    .find('.item.product.product-item.track-impression-product')
    .should('have.length',37)
}

export function getElement(name){
    cy.contains(name)
    .parentsUntil('.product-item-info')
    .find('.product.actions.product-item-actions > div > form > button')
    .click()
}

export function noLoader () {
    cy.get('.loader').should('not.exist')
}

export function shouldBeVisible(){
    cy.get('.qty-box.coffee-label-block-parent.body-popup-overlay.active:visible')
    .should('be.visible')
}

export function qtyList(qty){
    cy.wait(2000);
    cy.get('.qty-box.coffee-label-block-parent.body-popup-overlay.active:visible',{timeout:6000})
    .should('be.visible')
    .find('li.qty-item>span')
    .contains(qty)
    .click()
    //cy.get('[data-ui-id="message-success"]')
}

export function clickButton() {
    cy.get('.qty-box.coffee-label-block-parent.body-popup-overlay.active > .qty-box__overlay-wrapper > .qty-selector-field',{timeout:6000})
    .should('be.visible')
    .find('button.qty-selector-btn')
    .click()
    cy.wait(10000);
}
// --config-file
