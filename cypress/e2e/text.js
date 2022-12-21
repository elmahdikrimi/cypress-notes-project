//npx cypress run --spec "cypress/e2e/addFromHome.cy.js" --reporter json --reporter-options output=result.json
/// <reference types="cypress" />

//element by text
cy.xpath('//*[text()[contains(.,"My Boards")]]')
cy.contains('My Boards')
// Select a specific element by text
cy.xpath('//h1[contains(.,"My Boards")]')
cy.contains('h1', 'My Boards')
//element by attribute
cy.xpath('//*[@data-cy="create-board"]')
cy.get('[data-cy="create-board"]')
//element contains class
cy.xpath('//*[contains(@class, "font-semibold"]')
cy.get('.font-semibold')
//element with specific class, by text
cy.xpath('//*[contains(@class, "font-semibold")][text()[contains(.,"My Boards")]]')
cy.contains('.font-semibold', 'My Boards')
//filter element by index(xpath start index with 1 not 0)
cy.xpath('(//div[contains(@class, "board")])[1]')
cy.get('.board').eq(0)
//select child element
cy.xpath('//div[contains(@class, "list")]//child::div[contains(@class, "card")]')
cy.get('.list').find('.card')
//select an element containing a specific child element
cy.xpath('//div[contains(@class, "list")][.//div[contains(@class, "card")]]')
cy.get('.card').parents('.list')
//element after a specific element
cy.xpath('//div[contains(@class, "card")][preceding::div[contains(., "milk")]]')
cy.contains('.card', 'milk').next('.card')
//element before a specific element
cy.xpath('//div[contains(@class, "card")][following::div[contains(., "bread")]]')
cy.contains('.card', 'bread').next('.card')

//using {timeout:3000} to wait for elements to load
cy.visit('/')
cy.get('button', { timeout: 10000 })
  .should('be.visible')

//checking the number of certain element
cy.get('[data-cy=card]')
  .should('have.length', 2)

//waiting for requests that app does automatically
//using intercept()
//get response from /api/lists
cy.intercept('GET', '/api/lists').as('lists')
cy.visit('/board/1')
cy.wait('@lists')
cy.get('[data-cy=list]').should('not.exist')


//efficient chain writing 
cy.get('[data-cy="create-board"]') // parent
  .click() // child
cy.get('[data-cy="new-board-input"]') // parent
  .type('new board{enter}') // child
cy.location('pathname') // parent
  .should('contain', '/board/') // child

//checking if links inside a nav pointing to a live website
cy.get('a').each( link => {
    cy.request(page.prop('href'))
  })
  //child elements
  cy
  .get('.green > .circle');

  //class within class
  cy.get('[class="action-multiple-checkboxes"] [type="checkbox"]').check("checkbox1");



  //we can use .get .then to wait for elements to load
      // This works
      cy.get("[data-testid=element]").then($el => {
        // Do something with $el
    });

    // see if loader are done loading by not being visible
    cy.get("[data-testid=loader]").should("not.be.visible");

    //click the button
    cy.get('button:contains("Accept all")').click()


// cy.request() using env varibales

it('request with api and env',()=>{
  cy.request('GET', `${Cypress.env('externalApi')}/comments`)
  .then(response => cy.log(response))

  cy.log(Cypress.env('externalApi'))
})



cy.get('.product:visible') //gets .product only when visible
//parent child selector #2
cy.get('form input')

//save elements (like wrap) in beforeEach()
cy.get('.qty-box.coffee-label-block-parent.body-popup-overlay.active')
.as('qtyBox')

// in it()
cy.get('@qtyBox')

//pseudo class
cy.get('.signup-submit:invalid')




//iterate through a list of elements using .each()
const productNamesArr=[]
cy.get('.products').find('.product')
  .each(($el, index, $list)=>{
  productNamesArr.push($el.find('h4.product-name').text())
  })

  cy.get('.items li').each(($item) =>{
    expect($item.text()).to.include('Tooth')
  })

  //iterate thought each item and remove it by clicking its remove button
  it('should remove an item from the page',()=>{
    cy.get('.items li').each(($li)=>{
      cy.wrap($li).find('.remove').click()
      cy.wrap($li).should('not.exist')
    });
  })

  //submit a form 
  cy.get('form').submit();

  // ALIASES
  cy.get('.items-unpacked').as('unpacked')
  //to use the alias we use @ 
  cy.get('@unpacked').find('label').first().as('firstItem')
  //invoke() used to get an element attribute or proprety text, href...
  cy.get('@firstItem').invoke('text').as('text')
  
  cy.get('@text').then((text)=>{
    cy.get('@unpackedItems').find('label').first().should('include.text', text )
  })


  cy.get('item-label').invoke('text')
  .then((text)=>{
    cy.get('item-label').click();
    cy.get('packedItems').contains(text);
  })

// INPUTS
//dropdown menus
cy.get('restaurant-filter').select('Taco Bell')
cy.get('restaurant-filter').should('have.value','Taco Bell')
//checkbox
cy.get('input[type="checkbox"]').as('checkbox').check() //or uncheck()
cy.get('@checkbox').should('be.checked')
//range
cy.get('.rating').invoke('val','7').trigger('input')
cy.get('input[type=range]').as('range').invoke('val', 25).trigger('change')
cy.get('rating').should('have.value','7')


// Programmatically Generating Tests
const propreties =[
  'name',
  'whereToOrder',
  'description',
  'ingredient',
  'price'
];
    for (let proprety of propreties){
    it(`Should have a column for ${proprety}`,()=>{
      cy.get(`#${proprety}-column`)
    })
    }
const restaurants = [
  'Taco Bell',
  'Mcdonals',
  'Burger King',
  'Wendys'
]
    for(let restaurant of restaurants){
      it(`Display only rows that match ${restaurant} when selected`,()=>{
        cy.get('@restaurant-filter').select(restaurant)
        cy.get('td[headers="whereToOrder-column"]').should('contain', restaurant)
        .and('have.length.at.least', 1)

      })
    }
    //use invoke to get property directly or use .then 
    cy.get('td.popularity').invoke('text').should('be.gte',rating) //be.gte = be greater or equal to

    cy.get('td.popularity').each($el =>{
      expect(+$el.text()).to.be.gte() // adding + in front a text convert it to a number
    })

    // window 
    cy.title().should('contain', 'echo chamber')
    cy.location('pathname').should('equal','echo-chamber/sign-up') //contain

    // Form Validation
    it('Should require Email',() => {

      cy.get('@submit').click()
      
      cy.get('[data-test="sign-up-email"]:invalid') //pseudo Selector to check for invalid email pop up
      .invoke('prop','validationMessage')
      .should('contain','Please fill out this field')

      cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop','validity') // validity is a DOM API (to check for more)
      .its('valueMissing').should('be.true')

    })

    // Task And Commands 

    //Task to execute things in node
    //Task
    e2e: {
      setupNodeEvents(on,config)
        on('task', {
          hello({greeting,name}){
            console.log(`${greeting} ${name}`)

            return null
          }
        })
      }
    

    cy.task('hello',{greeting:'hello', name:'World'})

    //Commands
    const user = {
      username:'user1',
      password:'56'
    }

    Cypress.Commands.add('signIn', (user)=>{
      cy.visit('/sign-in')
      cy.get('[data-test="sign-up-email"]').type(user.username)
      cy.get('[data-test="sign-up-password"]').type(user.password)
      cy.get('.sign-in-submit').click()
    })

    cy.signIn(user)

    Cypress.Commands.add('getData', (attribute)=>{
      return cy.get(`[data-test=${attribute}"]`)
    })

    // Network Requests And Intercept

    const pokemon = [
      { id:1, name:'Bulbasur'},
      { id:2, name:'Charmander'},
      { id:3, name:'Turtle'}
    ]
    describe('pokemon search',()=>{
      beforeEach(()=>{
      cy.visit('/pokemon-search')
      cy.get('.search').as('search')
      cy.intercept('/pokemon-search/api?*').as('api')
      })
      it('should call the api when user types',()=>{
        cy.get('@search').type('ivy')
        cy.wait('@api')
      })
      it('should render the results on page',()=>{
        cy.intercept('/pokemon-search/api?*', {pokemon}).as('stubbed') //if intercepted succefully, return object pokemon, ignore the reponse, pokemon is mock data
        cy.intercept('/pokemon-search/api/1', {fixtures: 'bulbasur'})// bulbasur is a json file in the fixture directory
        .as('bulba-fixture')
      })
         
    })

    // Session And Testing Cookies
    
//Session 

cy.session(email, () => {
  cy.visit('/login')
  cy.get('[data-cy=login-email]').type(email)
  cy.get('[data-cy=login-password]').type(`${password}`)
  cy.get('[data-cy=login-submit]').click()
  cy.location('pathname').should('eq', '/')
}, { 
  cacheAcrossSpecs: true
})


 
cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1');
//checking multiple options
cy.get('input[type="checkbox"]').check(['option1','option3'])

//Dynamic dropdown boxes - autocomplete

cy.get('#autocomplete').type('ind')
cy.get('.ul-menu-item div').each(($el)=>{
  if($el.text()==='India'){
    $el.click()
  }
})
cy.get('#autocomplete').should('have.value','India')


//Alerts pop up (cypress auto accepts alerts and pop ups)
cy.get('#alertBtn').click()
//to capture the pop up, cypress listens to browser(window) events using cy.on()
cy.on('window:alert', (str)=>{
  expect(str).to.equal('Hello, this an alert')
})
//confirm alert
cy.get('[value="confirm"]').click()
cy.on('window:confirm', (str)=>{
  expect(str).to.equal('Hello, confirm this')
})

//Handling Child tab using a combo of cypress & jQuery commands 
//invoke() invokes a function on an element (like jquery functions)
//remove the attribute target=_blank to prevent link from opening in a new tab
cy.get('#openTab').invoke('removeAttr','target').click()
cy.url().should('include','/homepage/sign-up')
//browser navigation controls
cy.go('back')
cy.go('forward')

//Handling Tables
cy.get('tr td:nth-child(2)').each(($el,index,$list)=>{//nth-child(2) css selector gets the second child
  let text = $el.text()
  if(text.includes('Python')){
    cy.get('tr td:nth-child(2)').eq(index).next().then((text)=>{
      expect(text.text()).to.equal('25')
    }) //next() get the immediate next sibling
  }
}) 

//Handling mouse over
//show is jQuery method that shows hidden element
cy.get('#mouseOver').invoke('show')
cy.contains('top').click()
cy.url().should('include','top')



    






//load data
//cy.fixture() command takes a file name as an argument and loads the file content to a specified variable.
cy.fixture('example.json').then((data) => {
  signUpData = data
})
//to change the default fixture folder for cy.fixture to look in, we use this config
fixtureFolder:'cypress/fixtures',
//read a file
cy.readFile('path/to/data.json').its('name').should('eq', 'Eliza')
// write in a file
cy.writeFile('path/to/data.json', { name: 'Eliza', email: 'eliza@example.com' })
cy.readFile('path/to/data.json').then((user) => {
  expect(user.name).to.equal('Eliza') // true
})
//get data from an api and write it in a file 
cy.request('https://jsonplaceholder.typicode.com/users').then((response) => {
  cy.writeFile('cypress/fixtures/users.json', response.body)
})


//grab attribute value by invoking json prop() method on the element
cy.get('#openTab').then((url)=>{
  const url = url.prop('href')
})

//used in before hooks to load before each test 
cy.fixture('exemple').then((data)=>{
  this.data=data //this makes the variable data used globally, usable outside this scope
})
cy.get('input').type(this.data.name) //exemple has object with name key

//validate an element attribute 
cy.get('input[name="name"]:nth-child(2)')
.should('have.attr','minlength','2')

//iterate through a list of products by click on their add buttons
Cypress.Commands.add('selectProduct',(productName)=>{
  cy.get('h4.card-title').each((el,index,list)=>{
    if(el.text().includes(productName)){
      cy.get('button.btn-info').eq(index).click()
    }
  })
})
cy.selectProduct('BlackBerry')
//productName is an array of elements in the fixture object
this.data.productName.forEach((element)=>{
  cy.selectProduct(element)
})

//pause the test
cy.pause()

//POM
//homepage.js
class homepage{
  getEditBox(){
    return cy.get('input[name="name"]:nth-child(2)')
  }
}
export default homepage;
import { get } from 'cypress/types/lodash'
//homepage.cy.js
import homepage from '../pages/homepage'
//create new homepage object
const homePage = new homepage()
homePage.getEditBox().type('hello')


//explicit timeouts
//adding a commandTimeout to a specific test

it('my first testCase',()=>{
  Cypress.config('defaultCommandTimeout',8000)//this command is appliable from this step forward
  cy.get('button').click()
})

cy.get('.alert').should('have.text', 'product added succefully')
// verify if element includes a text
cy.get('.alert').then((element)=>{
  const elTxt = element.text()
  expect(elTxt.includes("Success")).to.be.true //chain assertion
})

//getting the interger from a string with a $ currency (example)
let sum = 0
cy.get('tr td:nth-child(4) strong').each(($el,index,$list)=>{
const amount = $el.text()
let result = amount.split(' ') //split() splits the string into two parts and stores them in an array
result = result[1].trim() //trim() to remove extra spaces
sum += parseInt(result)
sum = Number(sum) + Number(result) //Number() converts a string to number
}).then(()=>{ //wait till the this step is complete only then move to next (resolving a promise)
  cy.log(sum)
})

//comparing the sum of products to the sum displayed in cart 
cy.get('h3 strong').then((element)=>{
  const eleTxt = element.text()
  let res = eleTxt.split(' ')
  let total = res[1].trim()
  expect(sum).to.equal(Number(total)) // refer to chai assertions for more 
})
//(use chai Assertions first instead of js assertions)
cy.visit(Cypress.env('url') + '/product/');

//Hooks
before(()=>{
  //runs only once 
})
beforeEach(()=>{
  //runs before each test
})

//if we are using .this keyword, dont use arrow functions 

//Cucumber Tags
//run cucumber tags
//npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome

//Moch HTTP Responses, Generating STUB data / mocking data
//Testing API with frontEnd
cy.visit('https://rahulshettyacademy.com/angularAppdemo')
cy.intercept(
  {
    method:'GET',
    url:'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
  },
  {
    statusCode:200,
    body:[{
          "book_name": "RobotFramework",
          "isbn": "984353",
          "aisle": "982053"
          }]
  }).as('bookGetters')
cy.get('button[class="btn]').click()
//wait till the promise is resolved
cy.wait('@bookGetters').should(({request,response})=>{
  cy.get('tr').should('have.length',response.body.length + 1)
})

// Intercepting HTTP request details to test Security Scenarios

cy.visit('https://rahulshettyacademy.com/angularAppdemo')
//different intercept syntax
cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',(req)=>{
//changing the url with user malhotra to test the reponse's status code
req.url='https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
  req.continue((res)=>{
    expect(res.statusCode).to.equal(403)
  })
}).as('testUrl')
cy.get('button[class="btn]').click()
cy.wait('@testUrl')

//API testing without a FrontEnd


cy.request('POST','https://api.com/addbook.php',{
    "name":"The lord of the rings",
    "isbn":"bcheg"
}).then((res)=>{
  expect(res.body).to.have.property("name","the lord of the rings")
  expect(res.status).to.equal(200)
})


//Session Token and local Storage

//Make API login call to extract the response token 

Cypress.Commands.add('LoginApi', ()=>{
  //"POST","URL","{Payload}"
  cy.request('POST',
  "https://rahulshettyacademy.com/api/ecom/auth/login",
  {
  "userEmail":"mehdi@gmail.com", 
  "userPassword":"mehdi123"
  }).then((response)=>{
    expect(response.status).to.be.equal(200)
    //setting the token in an envirment varibale to be available globally
    Cypress.env('token', response.body.token)
  })
})
it('logged in through local storage',()=>{
  cy.loginApi().then(()=>{

    cy.visit('https://rahulshettyacademy.com/client',
    {
      onBeforeLoad:(window)=>{
        window.localStorage.setItem('token', Cypress.env('token'))
      }
    })

  })

})

//iterate through a dropdown list in a seach/select bar and clicking the right element 

cy.get('.input').type('ind')
cy.get('.input-results').each(($el,index,$list)=>{
  if($el.text() === "India") {
    cy.wrap($el).click()
  }
})

//NeatCSV to read csv files with cypress
//const neatCSV = require('neat-csv')

import neatCSV from 'neat-csv';

cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_rahul.csv") //cy.readfile converts csv to text
  .then((text)=>

  {
    const csv = neatCSV(text)
    const actualProductCSV = csv[0]["Product Name"] //object key has a space in name, so we use ['key name'] to access it 
    expect(productName).to.equal(actualProductCSV)
  })


  // Cypress Data Base Integration testing 
  //after creating an sql server in Azure and creating a database with data
  // install npm cypress-sql-server

  //e2e.js 
  const sqlServer = require('cypress-sql-server')
  const dbconfig = require('../../cypress.config')
  //database config is stored in cypress.config.js
  module.exports = (on, config)=>{
    tasks = sqlServer.loadDBPlugin(dbconfig.db);
    on('task', tasks)
  }
  //cypress.config.js
  
  // {
  //   "db": {
  //     "userName":"rsa",
  //     "password":"Winter13",
  //     "server":"mehdi.database.windows.net",
  //     "options":{
  //       "database":"mehdidata",
  //       "encrypt":true,
  //       "rowCollectionOnRequestCompletion":true
  //     }
  //   }
  // }

//load the custom commands the plugin uses
// commands.js
import sqlServer from 'cypress-sql-server';
sqlServer.loadDBCommands();

// spec.cy.js file 
it('database interactions',()=>{
  cy.sqlServer('select * from persons').then((result)=>{
    console.log(result[0][1])
    expect('mehdi').to.equal(result[0][1])
  })
})
