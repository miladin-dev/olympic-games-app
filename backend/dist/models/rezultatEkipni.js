"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let RezultatEkipniSchema = mongoose_1.default.Schema;
let RezultatEkipni = new RezultatEkipniSchema({
    idTak: {
        type: Number
    },
    tim1: {
        type: String
    },
    tim2: {
        type: String
    },
    br_p1: {
        type: Number
    },
    br_p2: {
        type: Number
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    lokacija: {
        type: String
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    grupna_faza: {
        type: String
    }
});
exports.default = mongoose_1.default.model('RezultatEkipni', RezultatEkipni, 'ekipni_rezultati');
//# sourceMappingURL=rezultatEkipni.js.map