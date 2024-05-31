module.exports = {
    module: 'commonjs',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', '<rootDir>/__tests__'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};