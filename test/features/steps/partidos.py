from behave import *
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.select import Select

timeout = 10


@given('I enter {text} as partido date')
def step_impl(context, text):
    context.partido_date = context.browser.find_element_by_id('diaPartido')
    context.partido_date.send_keys(text)  # todo get the current date?


@given('I select {text} as partido rival')
def step_impl(context, text):
    context.select_rival = Select(context.browser.find_element_by_id('equipoPartido'))
    context.select_rival.select_by_visible_text(text)


@given('I select {text} as partido torneo')
def step_impl(context, text):
    context.select_torneo = Select(context.browser.find_element_by_id('torneoPartido'))
    context.select_torneo.select_by_visible_text(text)


@given('I enter {text} as partido instancia')
def step_impl(context, text):
    context.partido_instancia = context.browser.find_element_by_id('instanciaPartido')
    context.partido_instancia.send_keys(text)


@given('I enter {goles} as {de}')
def step_impl(context, goles, de):
    if de == "goles cai":
        context.goles = context.browser.find_element_by_id('golesCaiPartido')
    elif de == "goles rival":
        context.goles = context.browser.find_element_by_id('golesRivalPartido')

    context.goles.send_keys(goles)


@given('I select {text} as arbitro')
def step_implt(context, text):
    context.select_arbitro = Select(context.browser.find_element_by_id('arbitroPartido'))
    context.select_arbitro.select_by_visible_text(text)

@when('I click the Guardar button')
def step_impl(context):
    context.btnGuardar = context.browser.find_element_by_id('btnGuardar')
    context.btnGuardar.click()


@then('the new partido is saved')
def step_impl(context):
    context.txtGuardado = WebDriverWait(context.browser, timeout).until(expected_conditions.visibility_of_element_located((By.ID, 'guardadoOK')))
    assert context.txtGuardado.text == "Partido Guardado!"
    context.browser.close()
