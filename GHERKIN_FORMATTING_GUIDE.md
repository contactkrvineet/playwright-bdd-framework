# Gherkin Feature File Formatting Guide

## Standard Gherkin Format

### Indentation Rules

```gherkin
Feature: Feature name (No indentation)
  Feature description (2 spaces)
  More description (2 spaces)

  @tag1 @tag2 (2 spaces before tags)
  Scenario: Scenario name (2 spaces)
    Given step (4 spaces)
    When step (4 spaces)
    Then step (4 spaces)
    And step (4 spaces)
    But step (4 spaces)

  Scenario Outline: Outline name (2 spaces)
    Given step with <parameter> (4 spaces)
    When step (4 spaces)
    Then step (4 spaces)

    Examples: (4 spaces)
      | parameter | (6 spaces)
      | value1    | (6 spaces)
      | value2    | (6 spaces)
```

## Correct Formatting Example

```gherkin
Feature: User Login
  As a registered user
  I want to log into the application
  So that I can access my account

  Background:
    Given the application is running
    And I am on the login page

  @smoke @critical
  Scenario: Successful login with valid credentials
    Given I have valid credentials
    When I enter my username "user@test.com"
    And I enter my password "password123"
    And I click the login button
    Then I should see the dashboard
    And I should see my name "John Doe"

  @negative
  Scenario: Failed login with invalid password
    Given I am on the login page
    When I enter username "user@test.com"
    And I enter password "wrongpassword"
    And I click the login button
    Then I should see an error message
    And I should remain on the login page

  @regression
  Scenario Outline: Login with different user types
    Given I am on the login page
    When I login as "<userType>"
    Then I should see "<expectedPage>"

    Examples:
      | userType | expectedPage |
      | admin    | Admin Panel  |
      | user     | Dashboard    |
      | guest    | Home Page    |
```

## VS Code Formatting Settings

The following files ensure consistent formatting:

### 1. `.editorconfig`

- Sets tab size to 2 spaces
- Ensures LF line endings
- Trims trailing whitespace
- Inserts final newline

### 2. `.vscode/settings.json`

Key settings for feature files:

```json
{
  "[feature]": {
    "editor.defaultFormatter": "alexkrechik.cucumberautocomplete",
    "editor.tabSize": 2,
    "editor.insertSpaces": true,
    "editor.formatOnSave": true,
    "editor.formatOnType": true
  }
}
```

## Auto-Formatting

### Format on Save

Files will auto-format when you save (`Cmd+S` or `Ctrl+S`)

### Manual Format

- **Mac**: `Shift+Option+F`
- **Windows/Linux**: `Shift+Alt+F`
- **Command Palette**: `Cmd+Shift+P` → "Format Document"

## Common Formatting Issues

### ❌ Incorrect

```gherkin
Feature: Bad formatting

@tag
    Scenario: Inconsistent indentation
        Given step one
      When step two
            Then step three
```

### ✅ Correct

```gherkin
Feature: Good formatting

  @tag
  Scenario: Consistent indentation
    Given step one
    When step two
    Then step three
```

## Best Practices

1. **Use 2 spaces for indentation** (not tabs)
2. **Keep tags on their own line** above scenarios
3. **Add blank line between scenarios** for readability
4. **Align data tables properly**
5. **Use consistent keyword capitalization** (Given, When, Then)
6. **One blank line after Feature description**
7. **No trailing whitespace**
8. **End file with newline**

## Data Table Formatting

### ✅ Correct

```gherkin
Scenario: Data table example
  Given I have the following users:
    | name  | email           | role  |
    | John  | john@test.com   | admin |
    | Jane  | jane@test.com   | user  |
    | Bob   | bob@test.com    | guest |
```

### Using Pipes Alignment

Ensure all pipes `|` align vertically for readability.

## Multi-line Strings (Doc Strings)

```gherkin
Scenario: Multi-line text
  Given I have the following description:
    """
    This is a multi-line string.
    It preserves formatting.
    Use three quotes (""") to define it.
    """
  When I submit the form
  Then it should be saved
```

## Comments

```gherkin
# This is a comment
Feature: Commented feature

  # Comments can be placed anywhere
  Scenario: Example scenario
    # Even before steps
    Given I do something
```

## Quick Formatting Checklist

- [ ] Feature keyword at column 1
- [ ] Scenario keywords indented 2 spaces
- [ ] Steps indented 4 spaces
- [ ] Tags indented 2 spaces
- [ ] Data tables indented 4 spaces (headers at 6)
- [ ] Blank line between scenarios
- [ ] No trailing whitespace
- [ ] File ends with newline
- [ ] Consistent tag placement
- [ ] Pipes aligned in tables

## VS Code Extensions

Install these for better Gherkin support:

1. **Cucumber (Gherkin) Full Support** (alexkrechik.cucumberautocomplete)

   - Syntax highlighting
   - Auto-completion
   - Formatting
   - Go to definition

2. **Prettier** (esbenp.prettier-vscode)
   - General code formatting
   - Works with .editorconfig

## Keyboard Shortcuts

- `Cmd+Shift+P` → "Format Document" - Format entire file
- `Cmd+K Cmd+F` - Format selection
- Enable "Format On Save" in settings for automatic formatting

## Troubleshooting

### Formatter Not Working?

1. Check extension is installed: "Cucumber (Gherkin) Full Support"
2. Reload VS Code: `Cmd+Shift+P` → "Reload Window"
3. Verify `.vscode/settings.json` has correct formatter set
4. Check file extension is `.feature`

### Inconsistent Indentation?

1. Select all text: `Cmd+A`
2. Format: `Shift+Option+F`
3. Save: `Cmd+S`

### Tabs vs Spaces?

- Check `.editorconfig` exists
- Verify `editor.insertSpaces: true` in VS Code settings
- Convert tabs to spaces: `Cmd+Shift+P` → "Convert Indentation to Spaces"
