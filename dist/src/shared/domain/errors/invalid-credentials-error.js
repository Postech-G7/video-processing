"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = exports.CredentialsValidationError = void 0;
class CredentialsValidationError extends Error {
}
exports.CredentialsValidationError = CredentialsValidationError;
class InvalidCredentialsError extends Error {
    constructor(errors) {
        super('Invalid Credentials');
        this.errors = errors;
        this.name = 'InvalidCredentialsError';
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
//# sourceMappingURL=invalid-credentials-error.js.map