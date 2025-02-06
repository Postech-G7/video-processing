import { InvalidPasswordError } from '../../../application/errors/invalid-password-error';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class InvalidPasswordErrorFilter implements ExceptionFilter {
    catch(exception: InvalidPasswordError, host: ArgumentsHost): void;
}
