import { FieldsErrors } from '../validators/validator-fields.interface';
export declare class CredentialsValidationError extends Error {
}
export declare class InvalidCredentialsError extends Error {
    errors: FieldsErrors;
    constructor(errors: FieldsErrors);
}
