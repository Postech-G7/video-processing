"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordError = void 0;
class InvalidPasswordError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'InvalidPasswordError';
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
//# sourceMappingURL=invalid-password-error.js.map