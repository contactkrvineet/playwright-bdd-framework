const { setWorldConstructor, World } = require("@cucumber/cucumber");

class CustomWorld extends World {
  constructor(options) {
    super(options);
    // Add any custom properties or methods here
  }
}

setWorldConstructor(CustomWorld);
