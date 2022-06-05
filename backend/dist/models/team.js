"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TeamSchema = mongoose_1.default.Schema;
let Team = new TeamSchema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    drzava: {
        type: Array
    },
    konkurencija: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Team', Team, 'ekipe');
//# sourceMappingURL=team.js.map