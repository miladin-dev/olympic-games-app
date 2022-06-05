import express from 'express';
import { DelegatController } from '../controllers/delegat.controller';

const delegatRouter = express.Router();

delegatRouter.route('/dohvatiSveTakmicare').get(
    (req, res) => new DelegatController().dohvati_sve_takmicare(req, res)
);

delegatRouter.route('/setIndividRezultat').post(
    (req, res) => new DelegatController().set_individ_rezultat(req, res)
);

delegatRouter.route('/dohvatiTakmicenja').post(
    (req, res) => new DelegatController().dohvatiTakmicenja(req, res)
);

delegatRouter.route('/dohvatiIndividualneTakmicare').post(
    (req, res) => new DelegatController().dohvati_individualne_takmicare(req, res)
);
delegatRouter.route('/promeniRangIndivid').post(
    (req, res) => new DelegatController().promeni_rang_individ(req, res)
);

delegatRouter.route('/dohvatiSveRezultateIndivid').get(
    (req, res) => new DelegatController().dohvati_sve_rezultate_individ(req, res)
);

delegatRouter.route('/unesiRezultatIndivid').post(
    (req, res) => new DelegatController().unesi_rezultat_individ(req, res)
);

delegatRouter.route('/unesiKnockoutRezultat').post(
    (req, res) => new DelegatController().knockout_unesi_rezultat(req, res)
);

delegatRouter.route('/proveraUnetogRezultata').post(
    (req, res) => new DelegatController().proveraUnetogRezultata(req, res)
);

delegatRouter.route('/promeniGrupuTakmicenju').post(
    (req, res) => new DelegatController().promeni_grupu_takmicenju(req, res)
);
delegatRouter.route('/promeniGrupuTakmicenjuIndivid').post(
    (req, res) => new DelegatController().promeni_grupu_takmicenju_individ(req, res)
);

delegatRouter.route('/dohvatiPrvihN').post(
    (req, res) => new DelegatController().dohvati_prvih_n(req, res)
);

delegatRouter.route('/oznaciKrajIndividu').post(
    (req, res) => new DelegatController().oznaci_kraj_individ(req, res)
);

delegatRouter.route('/unesiMedaljuIndivid').post(
    (req, res) => new DelegatController().unesi_medalju_individ(req, res)
);

delegatRouter.route('/unosTenisRasporeda').post(
    (req, res) => new DelegatController().unesi_tenis_raspored(req, res)
)

delegatRouter.route('/unosTenisRezultata').post(
    (req, res) => new DelegatController().unesi_tenis_rezultat(req, res)
)

/*
*
*
*   EKIPNI
*
*
*/

delegatRouter.route('/setImaMedalju').post(
    (req, res) => new DelegatController().set_ima_medalju_tenis(req, res)
);

delegatRouter.route('/setImaMedalju').post(
    (req, res) => new DelegatController().set_ima_medalju(req, res)
);


delegatRouter.route('/dohvatiEkipneRezPoIdTak').post(
    (req, res) => new DelegatController().dohvati_ekipne_rez_poIDTak(req, res)
);

delegatRouter.route('/unosRasporedaKola').post(
    (req, res) => new DelegatController().unes_rasporeda_kola(req, res)
);

delegatRouter.route('/dohvatiEkipneRezultate').post(
    (req, res) => new DelegatController().dohvati_ekipne_rezultate(req, res)
);

delegatRouter.route('/unosSatnice').post(
    (req, res) => new DelegatController().unos_satnice(req, res)
);

delegatRouter.route('/unosPoena').post(
    (req, res) => new DelegatController().unos_poena(req, res)
);

delegatRouter.route('/formirajZdreb').post(
    (req, res) => new DelegatController().formiraj_zdreb(req, res)
);

delegatRouter.route('/updateZdreb').post(
    (req, res) => new DelegatController().update_zdreb(req, res)
);

delegatRouter.route('/dohvatiSveZdreb').post(
    (req, res) => new DelegatController().dohvati_sve_zdreb(req, res)
    );
    
delegatRouter.route('/setovanjeTimaEliminacioneFaze').post(
    (req, res) => new DelegatController().setTim_eliminaciona_faza(req, res)
);

delegatRouter.route('/unesiEliminacioneUtakmice').post(
    (req, res) => new DelegatController().init_eliminacione_utakmice(req, res)
);


delegatRouter.route('/dohvatiRezultateZaDatuGrupnuFazu').post(
    (req, res) => new DelegatController().dohvati_ekipnerez_za_datu_grupnuFazu(req, res)
);

delegatRouter.route('/unesiMedaljuEkipni').post(
    (req, res) => new DelegatController().unesi_medalju_ekipni(req, res)
);

delegatRouter.route('/unesiRasporedIndividualni').post(
    (req, res) => new DelegatController().unesi_raspored_individ(req, res)
);

delegatRouter.route('/dohvatiRasporedIndividualni').get(
    (req, res) => new DelegatController().dohvati_raspored_individ(req, res)
);

export default delegatRouter;