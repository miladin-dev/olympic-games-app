"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vodja_controller_1 = require("../controllers/vodja.controller");
const vodjaRouter = express_1.default.Router();
vodjaRouter.route('/insertParticipant').post((req, res) => new vodja_controller_1.VodjaController().insertParticipant(req, res));
vodjaRouter.route('/insertTeam').post((req, res) => new vodja_controller_1.VodjaController().insertTeam(req, res));
vodjaRouter.route('/insertDiscipline').post((req, res) => new vodja_controller_1.VodjaController().insertDiscipline(req, res));
vodjaRouter.route('/dohvatiSportove').get((req, res) => new vodja_controller_1.VodjaController().dohvati_sportove(req, res));
vodjaRouter.route('/unesiEkipu').post((req, res) => new vodja_controller_1.VodjaController().unesi_ekipu(req, res));
vodjaRouter.route('/dohvatiBrojTakmicara').post((req, res) => new vodja_controller_1.VodjaController().dohvati_broj_takmicara(req, res));
vodjaRouter.route('/dohvatiMojeTakmicare').post((req, res) => new vodja_controller_1.VodjaController().dohvati_moje_takmicare(req, res));
vodjaRouter.route('/formirajMedaljeSablon').post((req, res) => new vodja_controller_1.VodjaController().formiraj_medalje_sablon(req, res));
exports.default = vodjaRouter;
//# sourceMappingURL=vodja.routes.js.map