/**
 * Created by tavete on 4/19/16.
 */

module.exports = {
    browser: null,
    by: null,
    btnGuardar: function(){
        return this.browser.findElement(this.by.id('btnGuardar'));
    }
};
