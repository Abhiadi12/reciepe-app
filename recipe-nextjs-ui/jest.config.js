const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  testPathIgnorePatterns: [
    "<rootDir>/src/app/", // Exclude app directory
    "<rootDir>/src/store/", // Exclude store directory
    "<rootDir>/src/mocks/", // Exclude mocks directory
    "<rootDir>/src/constants", // Exclude constants directory
  ],
};

module.exports = createJestConfig(customJestConfig);
