class extractorElement {

        pageElements = {
            productContainer: () => cy.get('div.product-item-info').should('have.length',37).as('productList'),
            flavorsCheckBox: ()=>cy.get('[data-amshopby-filter="attr_aromatic_filter"] ol li input[type="checkbox"]').as('checkbox'),
            getProductName:()=> {
                let name=[]
                cy.get('@productList')
                .find('.product.name.product-item-name span')
                .each(($product)=>{
                    name.push($product.text().toLowerCase())
                })
                return name
            }
        }



        getProductsObj(){
            return this.pageElements.productContainer()
        }
        getName(){
            return this.pageElements.getProductName()
        }
        getFlavorBox(){
           return this.pageElements.flavorsCheckBox()
        }

        checkBoxVerification(){

        }
}

 module.exports = new extractorElement();