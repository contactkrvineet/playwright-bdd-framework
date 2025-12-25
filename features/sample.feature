Feature: Sample BDD Test with Playwright


    @smoke @regression
    Scenario: Verify vineet website title
            Given I navigate to "https://www.vineetkr.com"
            When I wait for the page to load
            Then the page title should contain "Technology Portfolio"

    @regression
    Scenario: Verify vineet website   link
            Given I navigate to "https://www.vineetkr.com"
            When I click on the "About Me" link
            Then I should see the documentation page
            And the URL should contain "about"
