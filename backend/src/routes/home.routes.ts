import express from 'express';
import { HomeController } from '../controllers/home.controller';

const homeRouter = express.Router();

homeRouter.route('/dohvatiSveTakmicare').get(
    (req, res) => new HomeController().dohvati_sve_takmicare(req, res)
);

homeRouter.route('/dohvatiSveMedalje').get(
    (req, res) => new HomeController().dohvati_sve_medalje(req, res)
);

homeRouter.route('/dohvatiSveSportove').get(
    (req, res) => new HomeController().dohvati_sve_sportove(req, res)
);
homeRouter.route('/pretraziTakmicare').post(
    (req, res) => new HomeController().pretrazi(req, res)
);
homeRouter.route('/dohvatiSvaZavrsenaTakmicenja').get(
    (req, res) => new HomeController().dohvati_sva_zavrsena_takmicenja(req, res)
);

export default homeRouter;