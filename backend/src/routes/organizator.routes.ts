import express from 'express';
import { OrganizatorController } from '../controllers/organizator.controller';

const orgRouter = express.Router();

orgRouter.route('/dohvatiNeodobreneKorisnike').get(
    (req, res) => new OrganizatorController().dohvati_neodobrene_korisnike(req, res)
);
orgRouter.route('/odobriKorisnika').post(
    (req, res) => new OrganizatorController().odobri_korisnike(req, res)
);
orgRouter.route('/unesiSport').post(
    (req, res) => new OrganizatorController().unesi_sport(req, res)
);

orgRouter.route('/dohvatiSveDelegate').get(
    (req, res) => new OrganizatorController().dohvati_sve_delegate(req, res)
);

orgRouter.route('/dohvatiRekorde').get(
    (req, res) => new OrganizatorController().dohvati_rekorde(req, res)
);

orgRouter.route('/dohvatiSveSportove').get(
    (req, res) => new OrganizatorController().dohvati_sve_sportove(req, res)
);

orgRouter.route('/unesiTakmicenje').post(
    (req, res) => new OrganizatorController().unesi_takmicenje(req, res)
);

orgRouter.route('/unesiDisciplinuSportu').post(
    (req, res) => new OrganizatorController().unesi_disciplinu_sportu(req, res)
);

orgRouter.route('/dohvatiPrijavljeneEkipe').post(
    (req, res) => new OrganizatorController().dohvati_prijavljene_ekipe(req, res)
);

orgRouter.route('/dohvatiPrijavljeneTakmicare').post(
    (req, res) => new OrganizatorController().dohvati_prijavljene_takmicare(req, res)
);

export default orgRouter;