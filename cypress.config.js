const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'aqus1v',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
