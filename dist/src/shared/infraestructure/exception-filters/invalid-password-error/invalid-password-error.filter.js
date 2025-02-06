"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidPasswordErrorFilter = void 0;
const invalid_password_error_1 = require("../../../application/errors/invalid-password-error");
const common_1 = require("@nestjs/common");
let InvalidPasswordErrorFilter = class InvalidPasswordErrorFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(422).send({
            statusCode: 422,
            error: 'Unprocessable Entity',
            message: exception.message,
        });
    }
};
exports.InvalidPasswordErrorFilter = InvalidPasswordErrorFilter;
exports.InvalidPasswordErrorFilter = InvalidPasswordErrorFilter = __decorate([
    (0, common_1.Catch)(invalid_password_error_1.InvalidPasswordError)
], InvalidPasswordErrorFilter);
//# sourceMappingURL=invalid-password-error.filter.js.map