"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
let IndividRasporedSchema = mongoose_1.default.Schema;
let IndividRaspored = new IndividRasporedSchema({
    idTak: {
        type: Number
    },
    datum: {
        type: String
    },
    vreme: {
        type: String
    },
    lokacija: {
        type: String
    }
});
exports.default = mongoose_1.default.model('IndividRaspored', IndividRaspored, 'individ_raspored');
//# sourceMappingURL=individRaspored.js.map