const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");

Given("I navigate to {string}", async function (url) {
  await this.page.goto(url);
});

When("I wait for the page to load", async function () {
  await this.page.waitForLoadState("networkidle");
});

Then("the page title should contain {string}", async function (expectedTitle) {
  const title = await this.page.title();
  expect(title).toContain(expectedTitle);
});

When("I click on the {string} link", async function (linkText) {
  await this.page
    .getByRole("link", { name: linkText, exact: true })
    .first()
    .click();
});

Then("I should see the documentation page", async function () {
  await this.page.waitForLoadState("networkidle");
  const url = this.page.url();
  expect(url).toContain("about");
});

Then("the URL should contain {string}", async function (expectedUrlPart) {
  const url = this.page.url();
  expect(url).toContain(expectedUrlPart);
});
