class utility{

    getProductInfo(){
        let envi = Cypress.env('productName')
        if(envi=='firstEnv'){
            return 
        }
    }
}


module.exports = new utility()