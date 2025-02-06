import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { InvalidCredentialsError } from '../../../../shared/application/errors/Invalid-credentials-error';
export declare class InvalidCredentialsErrorFilter implements ExceptionFilter {
    catch(exception: InvalidCredentialsError, host: ArgumentsHost): void;
}
