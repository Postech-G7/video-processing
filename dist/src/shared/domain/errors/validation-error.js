"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityValidationError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class EntityValidationError extends Error {
    constructor(errors) {
        super('Entity Validation Error');
        this.errors = errors;
        this.name = 'EntityValidationError';
    }
}
exports.EntityValidationError = EntityValidationError;
//# sourceMappingURL=validation-error.js.map