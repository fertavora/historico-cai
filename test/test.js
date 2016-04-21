/**
 * Created by tavete on 4/14/16.
 */


var webdriver = require('selenium-webdriver'),
    until = webdriver.until,
    By = webdriver.By;

var browser = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var testUrl = 'http://localhost:3000/';

var homePage = require('./homePage');
homePage.browser = browser;
homePage.by = By;

// var homePage = {
//     btnGuardar: function(d,b){
//         return d.findElement(b.id('btnGuardar'));
//     }
// };

browser.manage().window().maximize();
browser.get(testUrl);
browser.findElement(By.id('diaPartido')).sendKeys("01/04/2016");
browser.findElement(By.id('instanciaPartido')).sendKeys("01");
browser.findElement(By.id('btnGuardar')).click();
browser.wait(until.elementIsVisible(browser.findElement(By.id('guardadoOK')))).then(function(e){
    console.log(e.value);
});

// homePage.btnGuardar().click();

// browser.findElement(By.id('btnGuardar')).click();
