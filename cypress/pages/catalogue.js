class catalogue {

    elements = {
            okbutton: () => {
                cy.get('.qty-box.coffee-label-block-parent.body-popup-overlay.active > .qty-box__overlay-wrapper > .qty-selector-field')
                .find('button.qty-selector-btn').click()
            },
            pageLoader: () => cy.get('.loader').should('not.exist')
    }

        clickOkButton () {
           return this.elements.okbutton()
        }
        waitPageLoader () {
            this.elements.pageLoader()
        } 
}

module.exports = new catalogue();