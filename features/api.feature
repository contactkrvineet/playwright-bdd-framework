Feature: API Testing with Playwright
  As a QA Engineer
  I want to test REST API endpoints
  So that I can validate backend functionality

  Background:
    Given the API base URL is "https://jsonplaceholder.typicode.com"

  @smoke @api
  Scenario: Get all users
    When I send a GET request to "/users"
    Then the response status code should be 200
    And the response should be a JSON array
    And the response array should have 10 items

  @smoke @api
  Scenario: Get a specific user by ID
    When I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response should contain the following fields:
      | field    |
      | id       |
      | name     |
      | username |
      | email    |
    And the response field "id" should be 1
    And the response field "name" should be "Leanne Graham"

  @regression @api
  Scenario: Create a new user
    When I send a POST request to "/users" with body:
      """
      {
        "name": "John Doe",
        "username": "johndoe",
        "email": "john.doe@example.com"
      }
      """
    Then the response status code should be 201
    And the response field "name" should be "John Doe"
    And the response field "username" should be "johndoe"

  @regression @api
  Scenario: Update an existing user
    When I send a PUT request to "/users/1" with body:
      """
      {
        "id": 1,
        "name": "Updated Name",
        "username": "updateduser",
        "email": "updated@example.com"
      }
      """
    Then the response status code should be 200
    And the response field "name" should be "Updated Name"
    And the response field "username" should be "updateduser"

  @regression @api
  Scenario: Partially update a user
    When I send a PATCH request to "/users/1" with body:
      """
      {
        "email": "newemail@example.com"
      }
      """
    Then the response status code should be 200
    And the response field "email" should be "newemail@example.com"

  @regression @api
  Scenario: Delete a user
    When I send a DELETE request to "/users/1"
    Then the response status code should be 200

  @regression @api
  Scenario: Get all posts for a user
    When I send a GET request to "/users/1/posts"
    Then the response status code should be 200
    And the response should be a JSON array
    And all items should have field "userId" with value 1

  @regression @api
  Scenario: Verify response time
    When I send a GET request to "/users"
    Then the response status code should be 200
    And the response time should be less than 2000 milliseconds

  @regression @api
  Scenario: Verify response headers
    When I send a GET request to "/users/1"
    Then the response status code should be 200
    And the response header "content-type" should contain "application/json"

  @negative @api
  Scenario: Get non-existent user
    When I send a GET request to "/users/9999"
    Then the response status code should be 404

  @smoke @api
  Scenario Outline: Get multiple users by ID
    When I send a GET request to "/users/<userId>"
    Then the response status code should be 200
    And the response field "id" should be <userId>

    Examples:
      | userId |
      | 1      |
      | 2      |
      | 3      |
