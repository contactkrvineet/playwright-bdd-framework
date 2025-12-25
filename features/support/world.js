const { setWorldConstructor, World } = require("@cucumber/cucumber");
const { request } = require("@playwright/test");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    // Playwright API request context
    this.request = request;
    // Add any custom properties or methods here
  }
}

setWorldConstructor(CustomWorld);
