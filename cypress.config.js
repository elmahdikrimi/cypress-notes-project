const { defineConfig } = require("cypress");


module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
};

module.exports = defineConfig({
  reporter:'mochawesome',
    reporterOptions: {
      reportDir: "cypress\\report",
      overwrite: false,
      html: false,
      json: true,
      charts: true,
      reportPageTitle: 'Title',
      embeddedScreenshots: true
    },
    screenshotsFolder:"mochawesome-report",
    //changing the fixture default folder cy.fixture()
    fixturesFolder:"cypress/data",

  env:{
    version:'local',
    productName:"ISTANBUL ESPRESSO",
    qty:9
  },


  e2e: {
 

    baseUrl:'https://ma.buynespresso.com/ma_en',
      watchForFileChanges:false, //disables auto test run when u change code
      defaultCommandTimeout:10000,
      //pageLoadTimeout:60000,
      retries:{
        openMode:2,
        runMode:1
      },
      video:false,
      chromeWebSecurity:false,
      experimentalSessionAndOrigin:true,
      
      
      

      setupNodeEvents(on, config) {
        // implement node event listeners here

        //to pass different env by name 
        
        const deepmerge = require("deepmerge");
        const path = require("path");
        const fs = require("fs");
        // Load the Config File
        function loadconfig(filename) {
          const configJson = require(filename);
          if (configJson.extends) {
            const baseConfigFileName = path.join(
              path.dirname(filename),
              configJson.extends
            );
            const baseConfig = loadconfig(baseConfigFileName);
            return deepmerge(baseConfig, configJson);
          } else {
            return configJson;
          }
        }
  
  
        module.exports = (on, config) => {
          on("task", {
            readFiles(folderName) {
              return new Promise((resolve, reject) => {
                fs.readdir(folderName, (err, files) => {
                  if (err) {
                    return reject(err);
                  }
                  resolve(files);
                });
              });
            },
          });
          return loadconfig(config.config);
        };

        


      },
    //to specify the specs we are running
    //specPattern: 'cypress/cucumber/*.feature'
    specPattern:'cypress/e2e/api.cy.js'
  },
});
