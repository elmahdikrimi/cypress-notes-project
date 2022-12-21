
describe('add product from catalogue',()=>{

    beforeEach(()=>{

        cy.on('uncaught:exception',(e, runnable)=>{
            console.log('error =>', e)
            console.log("runs", runnable)
            if(e.message.includes('Cannot read properties of undefined')){
              return false
            }
            
          })
    })
    // pass { defaultCommandTimeout: 5000 } in it() will wait 5 seconds for element to appear in dom
    it.skip('Locating product',()=>{
        cy.visit('/')
        cy.get("[data-test='here']", {timeout: 6000}).eq(0).click({timeout:6000}) //
        cy.location('pathname').should('include', '/cafe')

    })
    //it.skip()

    it.skip('select quantity and click button',()=>{
        cy.visit('/cafe.html')
        cy.get('.list-item-form',{timeout: 6000}).find('button[type="submit"]').eq(0).click({timeout:6000})
        cy.get('.qty-box',{timeout: 6000}).eq(0).should('exist').and('be.visible')
        cy.get('button[type="submit"]').and('contain','OK')
        

    })

    
            it('Add to cart using list items',{scrollBehavior: false}, ()=>{

            const proName='ISPIRAZIONE GENOVA LIVANTO'.toLowerCase().replaceAll(' ','-');
            const qty=9;

            cy.visit(`/${proName}`)

            cy.get('#product_addtocart_form')
            .find('.pdpcart-btn')
            .click({force:true})//

            //this no longer needed,kept for reference
           cy.get('.qty-box.pdpcart.coffee-label-block-parent.body-popup-overlay.active')
           .find('li')
           .should('have.length',15)

           cy.get('.qty-box.pdpcart.coffee-label-block-parent.body-popup-overlay.active')
           .find('li')
           .then(li =>{
            cy.wrap(li).as('li');
           })

           cy.get('@li',{timeout:6000}).contains(qty).click()

           cy.get('[data-ui-id="message-success"]').should('be.visible')
           cy.get('.counter-number').contains(qty)

           cy.get('#mini-cart > div.product').should('not.exist')

           //cy.get('.minicart-wrapper > a').click()
           
           })
           

    })

    
