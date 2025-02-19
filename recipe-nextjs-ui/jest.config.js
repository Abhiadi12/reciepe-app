const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|scss|sass)$": "identity-obj-proxy",

    // Handle module aliases
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/mocks/(.*)$": "<rootDir>/src/mocks/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
  },
  testPathIgnorePatterns: [
    "<rootDir>/src/app/", // Exclude app directory
    "<rootDir>/src/store/", // Exclude store directory
    "<rootDir>/src/mocks/", // Exclude mocks directory
    "<rootDir>/src/constants", // Exclude constants directory,
    "<rootDir>/src/hooks", // Exclude utils directory
    "<rootDir>/src/hoc", // Exclude hoc directory
  ],
};

module.exports = createJestConfig(customJestConfig);
