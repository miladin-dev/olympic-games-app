"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ParticipantSchema = mongoose_1.default.Schema;
let Takmicar = new ParticipantSchema({
    // _id: {
    //     type : String
    // },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: Array
    },
    drzava: {
        type: String
    },
    ima_medalju: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Takmicar', Takmicar, 'takmicari');
//# sourceMappingURL=participant.js.map