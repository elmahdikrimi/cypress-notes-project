class errorMessages {

    pageElement = {
        successMessage: () => cy.get('[data-ui-id="message-success"]'),
        errorMessage: () => cy.get('[data-ui-id="message-error"]'),
        addToBag:()=> cy.get('.action.tocart.primary.list.pdpcart-btn').as('addToBag')

    }

    successMsgVisible () {
        return this.pageElement.successMessage()
    }
    failureMsgVisible () {
        return this.pageElement.errorMessage()
    }
    addToBagBtn(){
        return this.pageElement.addToBag()
    }
}

module.exports = new errorMessages();