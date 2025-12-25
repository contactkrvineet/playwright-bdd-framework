// @ts-check

module.exports = {
  default: {
    require: ["features/step_definitions/**/*.js", "features/support/**/*.js"],
    format: [
      "progress-bar",
      "html:reports/cucumber-html-report.html",
      "json:reports/cucumber-report.json",
      "junit:reports/cucumber-junit-report.xml",
    ],
    formatOptions: {
      snippetInterface: "async-await",
    },
    publishQuiet: true,
    dryRun: false,
    parallel: process.env.PARALLEL ? parseInt(process.env.PARALLEL) : 1,
  },
};
