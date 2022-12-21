export function catchError () {
            
    cy.on('uncaught:exception',(e, runnable)=>{
        console.log('error =>', e)
        console.log("runs", runnable)
        if(e.message.includes('Cannot read properties of undefined') || e.message.includes('Cannot convert undefined or null to object')){
          return false
        }
        
      })
}

export function convertName (productName) {
  return productName.toLowerCase().replace(' ','-')
}
