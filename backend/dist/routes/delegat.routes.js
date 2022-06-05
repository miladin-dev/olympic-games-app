"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const delegat_controller_1 = require("../controllers/delegat.controller");
const delegatRouter = express_1.default.Router();
delegatRouter.route('/dohvatiSveTakmicare').get((req, res) => new delegat_controller_1.DelegatController().dohvati_sve_takmicare(req, res));
delegatRouter.route('/setIndividRezultat').post((req, res) => new delegat_controller_1.DelegatController().set_individ_rezultat(req, res));
delegatRouter.route('/dohvatiTakmicenja').post((req, res) => new delegat_controller_1.DelegatController().dohvatiTakmicenja(req, res));
delegatRouter.route('/dohvatiIndividualneTakmicare').post((req, res) => new delegat_controller_1.DelegatController().dohvati_individualne_takmicare(req, res));
delegatRouter.route('/promeniRangIndivid').post((req, res) => new delegat_controller_1.DelegatController().promeni_rang_individ(req, res));
delegatRouter.route('/dohvatiSveRezultateIndivid').get((req, res) => new delegat_controller_1.DelegatController().dohvati_sve_rezultate_individ(req, res));
delegatRouter.route('/unesiRezultatIndivid').post((req, res) => new delegat_controller_1.DelegatController().unesi_rezultat_individ(req, res));
delegatRouter.route('/unesiKnockoutRezultat').post((req, res) => new delegat_controller_1.DelegatController().knockout_unesi_rezultat(req, res));
delegatRouter.route('/proveraUnetogRezultata').post((req, res) => new delegat_controller_1.DelegatController().proveraUnetogRezultata(req, res));
delegatRouter.route('/promeniGrupuTakmicenju').post((req, res) => new delegat_controller_1.DelegatController().promeni_grupu_takmicenju(req, res));
delegatRouter.route('/promeniGrupuTakmicenjuIndivid').post((req, res) => new delegat_controller_1.DelegatController().promeni_grupu_takmicenju_individ(req, res));
delegatRouter.route('/dohvatiPrvihN').post((req, res) => new delegat_controller_1.DelegatController().dohvati_prvih_n(req, res));
delegatRouter.route('/oznaciKrajIndividu').post((req, res) => new delegat_controller_1.DelegatController().oznaci_kraj_individ(req, res));
delegatRouter.route('/unesiMedaljuIndivid').post((req, res) => new delegat_controller_1.DelegatController().unesi_medalju_individ(req, res));
delegatRouter.route('/unosTenisRasporeda').post((req, res) => new delegat_controller_1.DelegatController().unesi_tenis_raspored(req, res));
delegatRouter.route('/unosTenisRezultata').post((req, res) => new delegat_controller_1.DelegatController().unesi_tenis_rezultat(req, res));
/*
*
*
*   EKIPNI
*
*
*/
delegatRouter.route('/setImaMedalju').post((req, res) => new delegat_controller_1.DelegatController().set_ima_medalju_tenis(req, res));
delegatRouter.route('/setImaMedalju').post((req, res) => new delegat_controller_1.DelegatController().set_ima_medalju(req, res));
delegatRouter.route('/dohvatiEkipneRezPoIdTak').post((req, res) => new delegat_controller_1.DelegatController().dohvati_ekipne_rez_poIDTak(req, res));
delegatRouter.route('/unosRasporedaKola').post((req, res) => new delegat_controller_1.DelegatController().unes_rasporeda_kola(req, res));
delegatRouter.route('/dohvatiEkipneRezultate').post((req, res) => new delegat_controller_1.DelegatController().dohvati_ekipne_rezultate(req, res));
delegatRouter.route('/unosSatnice').post((req, res) => new delegat_controller_1.DelegatController().unos_satnice(req, res));
delegatRouter.route('/unosPoena').post((req, res) => new delegat_controller_1.DelegatController().unos_poena(req, res));
delegatRouter.route('/formirajZdreb').post((req, res) => new delegat_controller_1.DelegatController().formiraj_zdreb(req, res));
delegatRouter.route('/updateZdreb').post((req, res) => new delegat_controller_1.DelegatController().update_zdreb(req, res));
delegatRouter.route('/dohvatiSveZdreb').post((req, res) => new delegat_controller_1.DelegatController().dohvati_sve_zdreb(req, res));
delegatRouter.route('/setovanjeTimaEliminacioneFaze').post((req, res) => new delegat_controller_1.DelegatController().setTim_eliminaciona_faza(req, res));
delegatRouter.route('/unesiEliminacioneUtakmice').post((req, res) => new delegat_controller_1.DelegatController().init_eliminacione_utakmice(req, res));
delegatRouter.route('/dohvatiRezultateZaDatuGrupnuFazu').post((req, res) => new delegat_controller_1.DelegatController().dohvati_ekipnerez_za_datu_grupnuFazu(req, res));
delegatRouter.route('/unesiMedaljuEkipni').post((req, res) => new delegat_controller_1.DelegatController().unesi_medalju_ekipni(req, res));
delegatRouter.route('/unesiRasporedIndividualni').post((req, res) => new delegat_controller_1.DelegatController().unesi_raspored_individ(req, res));
delegatRouter.route('/dohvatiRasporedIndividualni').get((req, res) => new delegat_controller_1.DelegatController().dohvati_raspored_individ(req, res));
exports.default = delegatRouter;
//# sourceMappingURL=delegat.routes.js.map