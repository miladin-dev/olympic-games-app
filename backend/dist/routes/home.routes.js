"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const home_controller_1 = require("../controllers/home.controller");
const homeRouter = express_1.default.Router();
homeRouter.route('/dohvatiSveTakmicare').get((req, res) => new home_controller_1.HomeController().dohvati_sve_takmicare(req, res));
homeRouter.route('/dohvatiSveMedalje').get((req, res) => new home_controller_1.HomeController().dohvati_sve_medalje(req, res));
homeRouter.route('/dohvatiSveSportove').get((req, res) => new home_controller_1.HomeController().dohvati_sve_sportove(req, res));
homeRouter.route('/pretraziTakmicare').post((req, res) => new home_controller_1.HomeController().pretrazi(req, res));
homeRouter.route('/dohvatiSvaZavrsenaTakmicenja').get((req, res) => new home_controller_1.HomeController().dohvati_sva_zavrsena_takmicenja(req, res));
exports.default = homeRouter;
//# sourceMappingURL=home.routes.js.map