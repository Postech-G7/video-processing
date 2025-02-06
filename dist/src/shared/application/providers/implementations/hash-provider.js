"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashProvider = void 0;
const bcryptjs_1 = require("bcryptjs");
class HashProvider {
    constructor() {
        this.SALT_ROUNDS = 6;
    }
    async generateHash(payload) {
        return (0, bcryptjs_1.hash)(payload, this.SALT_ROUNDS);
    }
    async compareHash(payload, hash) {
        return (0, bcryptjs_1.compare)(payload, hash);
    }
}
exports.HashProvider = HashProvider;
//# sourceMappingURL=hash-provider.js.map