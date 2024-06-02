module.exports = {
    module: 'commonjs',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleDirectories: ['node_modules', '<rootDir>/__tests__'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'],
};