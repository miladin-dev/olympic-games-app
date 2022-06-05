"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SportSchema = mongoose_1.default.Schema;
let Sportovi = new SportSchema({
    sport: {
        type: String
    },
    disciplina: {
        type: Array
    },
    vrsta: {
        type: String
    },
    br_igraca: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Sportovi', Sportovi, 'sportovi');
//# sourceMappingURL=sport.js.map