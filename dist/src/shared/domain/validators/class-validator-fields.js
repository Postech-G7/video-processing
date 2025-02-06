"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidatorFields = void 0;
const class_validator_1 = require("class-validator");
class ClassValidatorFields {
    constructor() {
        this.errors = null;
        this.validatedData = null;
    }
    validate(data) {
        const validateSyncErrors = (0, class_validator_1.validateSync)(data);
        if (validateSyncErrors.length > 0) {
            this.errors = {};
            for (const error of validateSyncErrors) {
                const field = error.property;
                this.errors[field] = Object.values(error.constraints);
            }
            return false;
        }
        else {
            this.validatedData = data;
        }
        return !validateSyncErrors.length;
    }
}
exports.ClassValidatorFields = ClassValidatorFields;
//# sourceMappingURL=class-validator-fields.js.map