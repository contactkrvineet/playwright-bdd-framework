const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

let apiContext;
let response;
let responseTime;
let baseURL;

Given('the API base URL is {string}', async function (url) {
  baseURL = url;
  // Create API request context
  apiContext = await this.request.newContext({
    baseURL: baseURL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
});

When('I send a GET request to {string}', async function (endpoint) {
  const startTime = Date.now();
  response = await apiContext.get(endpoint);
  responseTime = Date.now() - startTime;
});

When('I send a POST request to {string} with body:', async function (endpoint, docString) {
  const body = JSON.parse(docString);
  const startTime = Date.now();
  response = await apiContext.post(endpoint, {
    data: body,
  });
  responseTime = Date.now() - startTime;
});

When('I send a PUT request to {string} with body:', async function (endpoint, docString) {
  const body = JSON.parse(docString);
  const startTime = Date.now();
  response = await apiContext.put(endpoint, {
    data: body,
  });
  responseTime = Date.now() - startTime;
});

When('I send a PATCH request to {string} with body:', async function (endpoint, docString) {
  const body = JSON.parse(docString);
  const startTime = Date.now();
  response = await apiContext.patch(endpoint, {
    data: body,
  });
  responseTime = Date.now() - startTime;
});

When('I send a DELETE request to {string}', async function (endpoint) {
  const startTime = Date.now();
  response = await apiContext.delete(endpoint);
  responseTime = Date.now() - startTime;
});

Then('the response status code should be {int}', async function (statusCode) {
  expect(response.status()).toBe(statusCode);
});

Then('the response should be a JSON array', async function () {
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
});

Then('the response array should have {int} items', async function (count) {
  const body = await response.json();
  expect(body.length).toBe(count);
});

Then('the response should contain the following fields:', async function (dataTable) {
  const body = await response.json();
  const fields = dataTable.raw().slice(1).map(row => row[0]);
  
  fields.forEach(field => {
    expect(body).toHaveProperty(field);
  });
});

Then('the response field {string} should be {int}', async function (field, value) {
  const body = await response.json();
  expect(body[field]).toBe(value);
});

Then('the response field {string} should be {string}', async function (field, value) {
  const body = await response.json();
  expect(body[field]).toBe(value);
});

Then('all items should have field {string} with value {int}', async function (field, value) {
  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  
  body.forEach(item => {
    expect(item[field]).toBe(value);
  });
});

Then('the response time should be less than {int} milliseconds', async function (maxTime) {
  expect(responseTime).toBeLessThan(maxTime);
  console.log(`Response time: ${responseTime}ms`);
});

Then('the response header {string} should contain {string}', async function (headerName, expectedValue) {
  const headers = response.headers();
  const headerValue = headers[headerName.toLowerCase()];
  expect(headerValue).toContain(expectedValue);
});

Then('the response should contain field {string}', async function (field) {
  const body = await response.json();
  expect(body).toHaveProperty(field);
});

Then('the response field {string} should not be empty', async function (field) {
  const body = await response.json();
  expect(body[field]).toBeTruthy();
});

Then('the response should match schema:', async function (docString) {
  const body = await response.json();
  const schema = JSON.parse(docString);
  
  // Simple schema validation
  Object.keys(schema).forEach(key => {
    expect(body).toHaveProperty(key);
    expect(typeof body[key]).toBe(schema[key]);
  });
});
