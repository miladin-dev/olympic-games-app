"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const organizator_controller_1 = require("../controllers/organizator.controller");
const orgRouter = express_1.default.Router();
orgRouter.route('/dohvatiNeodobreneKorisnike').get((req, res) => new organizator_controller_1.OrganizatorController().dohvati_neodobrene_korisnike(req, res));
orgRouter.route('/odobriKorisnika').post((req, res) => new organizator_controller_1.OrganizatorController().odobri_korisnike(req, res));
orgRouter.route('/unesiSport').post((req, res) => new organizator_controller_1.OrganizatorController().unesi_sport(req, res));
orgRouter.route('/dohvatiSveDelegate').get((req, res) => new organizator_controller_1.OrganizatorController().dohvati_sve_delegate(req, res));
orgRouter.route('/dohvatiRekorde').get((req, res) => new organizator_controller_1.OrganizatorController().dohvati_rekorde(req, res));
orgRouter.route('/dohvatiSveSportove').get((req, res) => new organizator_controller_1.OrganizatorController().dohvati_sve_sportove(req, res));
orgRouter.route('/unesiTakmicenje').post((req, res) => new organizator_controller_1.OrganizatorController().unesi_takmicenje(req, res));
orgRouter.route('/unesiDisciplinuSportu').post((req, res) => new organizator_controller_1.OrganizatorController().unesi_disciplinu_sportu(req, res));
orgRouter.route('/dohvatiPrijavljeneEkipe').post((req, res) => new organizator_controller_1.OrganizatorController().dohvati_prijavljene_ekipe(req, res));
orgRouter.route('/dohvatiPrijavljeneTakmicare').post((req, res) => new organizator_controller_1.OrganizatorController().dohvati_prijavljene_takmicare(req, res));
exports.default = orgRouter;
//# sourceMappingURL=organizator.routes.js.map