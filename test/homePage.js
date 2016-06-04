/**
 * Created by tavete on 4/19/16.
 */
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

function HomePage(browser){
    this.browser = browser;

}

HomePage.prototype.inputDiaPartido = function(){
  return this.browser.findElement(By.id('diaPartido'));
}

HomePage.prototype.inputInstanciaPartido = function (){
  return this.browser.findElement(By.id('instanciaPartido'));
}

HomePage.prototype.btnGuardar = function(){
  return this.browser.findElement(By.id('btnGuardar'));
}

HomePage.prototype.isPartidoGuardado = function(){
  var t = this;
  return new Promise(function(resolve, reject){
    t.browser.wait(until.elementIsVisible(t.browser.findElement(By.id('guardadoOK'))), 10000, "Guardado message not displayed after 10 seconds.").then(function(e){
      e.getText().then(function(textValue){
        resolve(textValue);
      }, function(error){
        reject(error);
      });
    });
  });
  

}

module.exports = HomePage;