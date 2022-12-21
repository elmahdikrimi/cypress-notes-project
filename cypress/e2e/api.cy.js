/// <reference types="cypress" />

describe('api testing',()=>{

    it('Visit link',()=>{
        cy.visit('https://petstore.swagger.io/')

        cy.intercept({
            method: 'GET',
            url:'https://petstore.swagger.io/v2/pet/findByStatus?status=sold'
        },
        {
            statusCode:200,
            body:[
                {
                    "id": 0,
                    "category": {
                      "id": 0,
                      "name": "string"
                    },
                    "name": "Sam the white",
                    "photoUrls": [
                      "string"
                    ],
                    "tags": [
                      {
                        "id": 0,
                        "name": "string"
                      }
                    ],
                    "status": "available"
                  }
            ]
        }).as('inter')


        cy.get('div#operations-pet-findPetsByStatus').click()
        cy.get('button[class="btn try-out__btn"]').click()
        cy.get('tr[data-param-in="query"]').find('select').select('sold')
        cy.get('div.execute-wrapper button').click()
        cy.wait('@inter')
    })

    it('api',()=>{
        cy.request('GET','https://petstore.swagger.io/v2/pet/findByStatus?status=sold').then((response)=>{
            expect(response.status).to.equal(200)
            
        })
    })
})


