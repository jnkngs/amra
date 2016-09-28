Feature: Player wants to see the game character and game map
    As a player of the game
    I want to see game character and the game map

    Scenario: Player starts game
        Given game is started
        And map data is loadeded succesfully
        When the map is rendered
        Then I should see player character and the game map
