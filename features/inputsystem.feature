Feature: Player wants to move and interact with the game world
As a player of the game
I want to move my character
So I can explore the game world around me

Scenario: Player moves upwards
    Given I am on the map
    And no obstacles surround me
    When I press key up
    Then I should move one tile upwards on the screen

Scenario: Player's movement is blocked
    Given I am on the map
    And there is obstacle upwards from me
    When I press key up
    Then I should not be able to move to occupied tile

Scenario: Player wants to act upon item
    Given I stand south of the item
    When I press act button
    Then I should get a response from the item