module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    moduleNameMapper: {
         "\\.(css|less)$": "<rootDir>/src/__mocks__/styleMock.js"
      },
      transform: {
        "^.+\\.[t|j]sx?$": "babel-jest"
      },
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js|jsx)', 
        '**/?(*.)+(spec|test).+(ts|tsx|js|jsx)' 
    ]
};
