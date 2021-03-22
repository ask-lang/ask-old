module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // we ignore as code test files
    testPathIgnorePatterns: ["/assembly/", "/node_modules/"],
  };