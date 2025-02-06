"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const node_crypto_1 = require("node:crypto");
const uuidValidate_1 = require("../../utils/uuidValidate");
class Entity {
    constructor(props, id) {
        if (id && !(0, uuidValidate_1.isUUIDValidV4)(id)) {
            throw new Error('Invalid id');
        }
        this._id = id ?? (0, node_crypto_1.randomUUID)();
        this.props = props;
    }
    get id() {
        return this._id;
    }
    toJson() {
        return {
            ...this.props,
            id: this._id,
        };
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map