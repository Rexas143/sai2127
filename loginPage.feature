@loginFeature
Feature: Login Functionality

    Background:
        Given user is on the login page
    @tc1
    Scenario: Validate Login Page
        Then the logo should be visible
        And the images should be visible
        And the text "Login" should be visible
        And the username field should be visible
        And the password field should be visible
        And the "Login" button should be visible and have color "rgb(255, 123, 29)"


    @tc2
    Scenario Outline: Validate Login
        When user enters "<username>" and "<password>"
        And clicks on the "Login" button
        Then user should be navigated to the dashboard page
        Examples:
            | username | password |
            | Admin    | admin123 |
            | invalid  | invalid  |

    @tc3
    Scenario Outline: Validate Social Media Icons
        Then the social media icons should be visible
        When user clicks on the social media icon with text "<iconText>"
        Then a new page should open with URL containing "<expectedUrl>"

        Examples:
            | iconText | expectedUrl                   |
            | LinkedIn | chrome-error://chromewebdata/ |
            | Facebook | chrome-error://chromewebdata/ |
            | Twitter  | chrome-error://chromewebdata/ |
            | YouTube  | chrome-error://chromewebdata/ |



