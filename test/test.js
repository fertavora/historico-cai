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

var homePage = {
    btnGuardar: function(d,b){
        return d.findElement(b.id('btnGuardar'));
    }
};

browser.manage().window().maximize();
browser.get(testUrl);
homePage.btnGuardar(browser, By).click();

// browser.findElement(By.id('btnGuardar')).click();
