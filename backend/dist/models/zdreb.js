"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let ZdrebSchema = mongoose_1.default.Schema;
let Zdreb = new ZdrebSchema({
    id_tak: {
        type: Number
    },
    ekipa: {
        type: String
    },
    br_p: {
        type: Number
    },
    bodovi: {
        type: Number
    },
    rang: {
        type: Number
    },
    grupa: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Zdreb', Zdreb, 'zdreb');
//# sourceMappingURL=zdreb.js.map