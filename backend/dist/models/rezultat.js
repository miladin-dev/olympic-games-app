"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let RezultatSchema = mongoose_1.default.Schema;
let Rezultat = new RezultatSchema({
    id: {
        type: Number
    },
    takmicar: {
        type: String
    },
    idTak: {
        type: Number
    },
    // sport : {
    //     type : String
    // },
    // disciplina : {
    //     type : String
    // },
    rezultat: {
        type: String
    },
    grupa: {
        type: String
    },
    rang: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Rezultat', Rezultat, 'rezultati');
//# sourceMappingURL=rezultat.js.map