const { defineConfig } = require("cypress");

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


  env:{
    productName:"PARIS ESPRESSO",
    productQty:12,

  },
  e2e: {
    baseUrl:'https://ma.buynespresso.com/ma_fr/machines.html',
    //specPattern
    specPattern: 'cypress/e2e/POM/catalogue.cy.js'



    
  },
  setupNodeEvents(on, config) {
    // implement node event listeners here
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
});
