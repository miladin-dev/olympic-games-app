"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let TakmicenjeSchema = mongoose_1.default.Schema;
let Takmicenje = new TakmicenjeSchema({
    id: {
        type: Number
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    lokacija: {
        type: Array
    },
    datum_od: {
        type: String
    },
    datum_do: {
        type: String
    },
    format: {
        type: String
    },
    delegati: {
        type: Array
    },
    ucesnici: {
        type: Array
    },
    tip: {
        type: String
    },
    grupa: {
        type: String
    },
    konkurencija: {
        type: String
    },
    postoji_raspored: {
        type: String
    },
    kraj: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Takmicenje', Takmicenje, 'takmicenja');
//# sourceMappingURL=takmicenje.js.map