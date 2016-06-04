/**
 * Created by tavete on 4/14/16.
 */

var webdriver = require('selenium-webdriver'),
    assert = require('assert'),
    test = require('selenium-webdriver/testing'),
    until = webdriver.until,
    By = webdriver.By;

var testUrl = 'http://localhost:3000/';

//page objects
var HomePage = require('./homePage');
var homePage;
const timeOut = 15000000;
var browser;

test.describe('Mocha Sandbox', function(){
  this.timeout(timeOut);
  this.slow(15000);

  test.beforeEach(function(){
    browser = new webdriver.Builder()
      .forBrowser('firefox')
      .build();

    homePage = new HomePage(browser);

    browser.manage().window().maximize();
    browser.get(testUrl);

  });

  test.it('Test A', function(done){
    homePage.inputDiaPartido().sendKeys("01/04/2016");
    homePage.inputInstanciaPartido().sendKeys("01");
    homePage.btnGuardar().click();
    homePage.isPartidoGuardado().then(function(text){
      assert.equal(text, "Partido", "Error message does not match!");
      done();
    }, function(error){
      console.error(error);
      done();
    });
  });
});