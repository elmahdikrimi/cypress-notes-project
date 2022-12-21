import addContext from "mochawesome/addContext";


// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath')


module.exports = (on, config) => {
    on('file:preprocessor', cucumber())
  }
  
// import 'cypress-mochawesome-reporter/register'

// Cypress.on("test:after:run", (test, runnable) => {  
// 	if (test.state === "failed") {    
// 		const screenshot =`${Cypress.spec.name}/${runnable.parent.title}${test.title} (failed) (attempt 2).png`;    
// 		addContext({ test }, screenshot);  
// 	}
// });

Cypress.on("test:after:run", (test, runnable) => {
    if (test.state === 'failed') {
        let item = runnable
        const nameParts = [runnable.title]

        // Iterate through all parents and grab the titles
        while (item.parent) {
            nameParts.unshift(item.parent.title)
            item = item.parent
        }

        const fullTestName = nameParts
            .filter(Boolean)
            .join(' -- ')           // this is how cypress joins the test title fragments

        const imageUrl = `${
            Cypress.spec.name
        }/${fullTestName} (failed).png`

        addContext({ test }, imageUrl)
    }
});

module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    return require('@bahmutov/cypress-extends')(config.configFile)
  }
  