"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/registrujKorisnika').post((req, res) => new user_controller_1.UserController().register(req, res));
userRouter.route('/dohvatiSveKorisnike').get((req, res) => new user_controller_1.UserController().dohvati_sve_korisnike(req, res));
userRouter.route('/login').post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route('/promenaLozinke').post((req, res) => new user_controller_1.UserController().promena_lozinke(req, res));
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map