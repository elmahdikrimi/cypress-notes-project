const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    testEnv:'FirstEnv',
    productInfo: {
    productName:"ISTANBUL ESPRESSO",
    productQty: 9
    }
  },

  viewportWidth: 1024,
  viewportHeight: 768,
  e2e: {
    baseUrl:'https://ma.buynespresso.com/ma_fr/',
    watchForFileChanges:false,
    defaultCommandTimeout:10000,

      retries:{
        openMode:2,
        runMode:1
      },

    //video:false,
    chromeWebSecurity:false,

      setupNodeEvents(on, config) {
        // implement node event listeners here
      },

    //to specify the specs we are running
    specPattern: 'cypress/e2e/POM/*.js'
  },
});
