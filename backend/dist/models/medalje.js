"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let MedaljeSchema = mongoose_1.default.Schema;
let Medalje = new MedaljeSchema({
    zemlja: {
        type: String
    },
    br_zlatnih: {
        type: Number
    },
    br_bronzanih: {
        type: Number
    },
    br_srebrnih: {
        type: Number
    },
    osvajaci: {
        type: Array
    },
    sportovi_disc: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Medalje', Medalje, 'medalje');
//# sourceMappingURL=medalje.js.map