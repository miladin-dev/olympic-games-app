import express from 'express';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.route('/registrujKorisnika').post(
    (req, res) => new UserController().register(req, res) 
);

userRouter.route('/dohvatiSveKorisnike').get(
    (req, res) => new UserController().dohvati_sve_korisnike(req, res) 
);


userRouter.route('/login').post(
    (req, res) => new UserController().login(req, res) 
);

userRouter.route('/promenaLozinke').post(
    (req, res) => new UserController().promena_lozinke(req, res) 
);


export default userRouter;