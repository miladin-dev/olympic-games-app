import express from 'express';
import { VodjaController } from '../controllers/vodja.controller';

const vodjaRouter = express.Router();

vodjaRouter.route('/insertParticipant').post(
    (req, res) => new VodjaController().insertParticipant(req, res)
);

vodjaRouter.route('/insertTeam').post(
    (req, res) => new VodjaController().insertTeam(req, res)
);

vodjaRouter.route('/insertDiscipline').post(
    (req, res) => new VodjaController().insertDiscipline(req, res)
);

vodjaRouter.route('/dohvatiSportove').get(
    (req, res) => new VodjaController().dohvati_sportove(req, res)
);

vodjaRouter.route('/unesiEkipu').post(
    (req, res) => new VodjaController().unesi_ekipu(req, res)
);
vodjaRouter.route('/dohvatiBrojTakmicara').post(
    (req, res) => new VodjaController().dohvati_broj_takmicara(req, res)
);

vodjaRouter.route('/dohvatiMojeTakmicare').post(
    (req, res) => new VodjaController().dohvati_moje_takmicare(req, res)
);
vodjaRouter.route('/formirajMedaljeSablon').post(
    (req, res) => new VodjaController().formiraj_medalje_sablon(req, res)
);

export default vodjaRouter;