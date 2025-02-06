"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyGlobalConfig = applyGlobalConfig;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const wrapper_data_interceptor_1 = require("./shared/infraestructure/interceptors/wrapper-data/wrapper-data.interceptor");
const conflict_error_filter_1 = require("./shared/infraestructure/exception-filters/conflict-error/conflict-error.filter");
const not_found_error_filter_1 = require("./shared/infraestructure/exception-filters/not-found-error/not-found-error.filter");
const invalid_password_error_filter_1 = require("./shared/infraestructure/exception-filters/invalid-password-error/invalid-password-error.filter");
const invalid_credentials_error_filter_1 = require("./shared/infraestructure/exception-filters/invalid-credentials-error/invalid-credentials-error.filter");
function applyGlobalConfig(app) {
    app.useGlobalPipes(new common_1.ValidationPipe({
        errorHttpStatusCode: 422,
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new wrapper_data_interceptor_1.WrapperDataInterceptor(), new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.useGlobalFilters(new conflict_error_filter_1.ConflictErrorFilter(), new not_found_error_filter_1.NotFoundErrorFilter(), new invalid_password_error_filter_1.InvalidPasswordErrorFilter(), new invalid_credentials_error_filter_1.InvalidCredentialsErrorFilter());
}
//# sourceMappingURL=global-config.js.map