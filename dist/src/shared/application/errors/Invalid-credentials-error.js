"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidCredentialsError = void 0;
class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'InvalidCredentialsError';
    }
}
exports.InvalidCredentialsError = InvalidCredentialsError;
//# sourceMappingURL=Invalid-credentials-error.js.map