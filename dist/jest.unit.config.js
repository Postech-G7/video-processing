"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    testRegex: '^(?!.*\\.(int|e2e)\\.spec\\.ts$).*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    coverageDirectory: '../coverage',
    testEnvironment: 'node',
};
//# sourceMappingURL=jest.unit.config.js.map