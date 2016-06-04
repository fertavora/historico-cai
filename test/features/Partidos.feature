Feature: Partidos

  Scenario: Add new partido
    Given I enter 27/05/2016 as partido date
    And I select Racing Club as partido rival
    And I select Campeonato 2016 as partido torneo
    And I enter 01 as partido instancia
    And I enter 3 as goles cai
    And I enter 0 as goles rival
    And I select Germán Delfino as arbitro
    When I click the Guardar button
    Then the new partido is saved