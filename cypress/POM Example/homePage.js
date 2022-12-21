class homePage {

        pageElements = {
            cafeMenu: () => cy.get("[data-test='here']").eq(0),
            productName: (product)=> cy.get(`[data-url*="${product}"]`),
            
        }

        clickMenu(){
            this.pageElements.cafeMenu().click();
        }
        clickProduct(product){
            this.pageElements.productName(product).click();
        }
        checkLocation(pathname){
            cy.location('pathname').should('include',pathname)
        }
}

//module.exports = new homePage();
module.exports = new homePage();