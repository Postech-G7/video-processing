import { ConflictError } from '../../../domain/errors/conflict-error';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ConflictErrorFilter implements ExceptionFilter {
    catch(exception: ConflictError, host: ArgumentsHost): void;
}
