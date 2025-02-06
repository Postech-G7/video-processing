import { NotFoundError } from '../../../../shared/domain/errors/not-found-error';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class NotFoundErrorFilter implements ExceptionFilter {
    catch(exception: NotFoundError, host: ArgumentsHost): void;
}
