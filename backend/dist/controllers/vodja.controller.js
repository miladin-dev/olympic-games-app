"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VodjaController = void 0;
const participant_1 = __importDefault(require("../models/participant"));
const team_1 = __importDefault(require("../models/team"));
const sport_1 = __importDefault(require("../models/sport"));
const medalje_1 = __importDefault(require("../models/medalje"));
class VodjaController {
    constructor() {
        this.insertParticipant = (req, res) => {
            let takmicar = new participant_1.default(req.body);
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let drzava = req.body.drzava;
            let pol = req.body.pol;
            let sport = req.body.sport;
            let disc = req.body.disciplina;
            console.log('insertParticipant');
            console.log(disc);
            participant_1.default.findOne({ 'ime': ime, 'prezime': prezime, 'drzava': drzava, 'pol': pol, 'sport': sport, 'disciplina': disc }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json({ 'message': 'Takmicar je vec prijavljen za datu disciplinu.' });
                }
                else {
                    participant_1.default.findOne({ 'ime': ime, 'prezime': prezime, 'drzava': drzava, 'pol': pol, 'sport': sport }, (err, odg) => {
                        if (err)
                            console.log(err);
                        if (odg) {
                            //samo pushuj
                            participant_1.default.collection.updateOne({ 'ime': ime, 'prezime': prezime, 'drzava': drzava, 'pol': pol, 'sport': sport }, { $push: { 'disciplina': disc } });
                            res.json({ 'message': 'Takmicaru je unesena disciplina.' });
                        }
                        else {
                            //savuj takmicara jer ne postoji
                            takmicar.save().then((takmicar) => {
                                res.status(200).json({ 'message': 'Takmicar je dodat.' });
                            }).catch((err) => {
                                res.status(400).json({ 'message': err });
                            });
                        }
                    });
                }
            });
        };
        this.insertDiscipline = (req, res) => {
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let disciplina = req.body.disciplina;
            participant_1.default.findOne({ 'ime': ime, 'prezime': prezime }, (err, korisnik) => {
                if (err)
                    console.log(err);
                if (korisnik) {
                    participant_1.default.collection.updateOne({ 'ime': ime, 'prezime': prezime }, { "$push": { "disciplina": disciplina } });
                }
            });
        };
        this.insertTeam = (req, res) => {
            let ekipa = new team_1.default(req.body);
            let ekipni_sport = req.body.sport;
            let ekipna_disc = req.body.disciplina;
            let ekipna_drz = req.body.drzava;
            let broj_igraca;
            if (!ekipna_disc) {
                sport_1.default.findOne({
                    'sport': ekipni_sport,
                    'disciplina': { $size: 0 },
                    'vrsta': 'ekipni'
                }, (err, odg) => {
                    if (err)
                        console.log(err);
                    if (odg) {
                        broj_igraca = odg.toObject().br_igraca;
                        console.log("BROJ IGRACA " + broj_igraca);
                    }
                });
            }
            else {
                console.log("//2");
                console.log(ekipna_disc);
                sport_1.default.findOne({
                    'sport': ekipni_sport,
                    'disciplina': ekipna_disc,
                    'vrsta': 'ekipni'
                }, (err, odg) => {
                    if (err)
                        console.log(err);
                    if (odg) {
                        console.log("ODG");
                        broj_igraca = odg.toObject().br_igraca;
                        console.log(odg.toObject().disciplina);
                        console.log(odg.toObject().br_igraca);
                    }
                    else {
                        console.log("NIJE PRONADJEN DATI SPORT");
                    }
                });
            }
            let count = parseInt(broj_igraca);
            //Da li postoji vec napravljen ulaz za Sport i sportsku disciplinu, ako postoji samo pushuj novu drzavu koja se takmici 
            participant_1.default.find({
                'sport': ekipni_sport,
                'disciplina': ekipna_disc,
                'drzava': ekipna_drz
            }, (err, odg) => {
                if (odg.length >= 4) {
                    team_1.default.findOne({
                        'sport': ekipni_sport,
                        'disciplina': ekipna_disc
                    }, (err, odg) => {
                        if (err)
                            console.log(err);
                        if (odg) {
                            team_1.default.collection.updateOne({ 'sport': ekipni_sport, 'disciplina': ekipna_disc }, { "$push": { "drzava": ekipna_drz } });
                        }
                        else {
                            ekipa.save().then((ekipa) => {
                                res.status(200).json({ 'message': 'team added' });
                            }).catch((err) => {
                                res.status(400).json({ 'message': err });
                            });
                        }
                    });
                }
            });
        };
        this.dohvati_sportove = (req, res) => {
            sport_1.default.find({}, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.dohvati_discipline = (req, res) => {
            let sport = req.body.sport;
            let vrsta = req.body.vrsta;
            sport_1.default.find({ 'sport': sport, 'vrsta': vrsta }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.unesi_ekipu = (req, res) => {
            let sport = req.body.sport;
            let disc = req.body.disciplina;
            let drzava = req.body.drzava;
            let konkurencija = req.body.konkurencija;
            console.log(disc + ' unesi_ekipu');
            team_1.default.findOne({ 'sport': sport, 'disciplina': disc, 'konkurencija': konkurencija }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    team_1.default.collection.updateOne({ 'sport': sport, 'disciplina': disc, 'konkurencija': konkurencija }, { $push: { 'drzava': drzava } });
                    res.json({ 'message': 'Dodata disciplina.' });
                }
                else {
                    let team = new team_1.default(req.body);
                    team.save().then(odg => res.json({ 'message': 'Dodat tim.' }))
                        .catch((err) => console.log(err));
                }
            });
        };
        this.dohvati_broj_takmicara = (req, res) => {
            let drz = req.body.drzava;
            participant_1.default.find({ 'drzava': drz }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg.length);
                }
            });
        };
        this.dohvati_moje_takmicare = (req, res) => {
            let drz = req.body.drzava;
            participant_1.default.find({ 'drzava': drz }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.formiraj_medalje_sablon = (req, res) => {
            let drz = req.body.drzava;
            medalje_1.default.findOne({ 'zemlja': drz }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                }
                else {
                    let med = new medalje_1.default({
                        zemlja: drz,
                        br_zlatnih: 0,
                        br_bronzanih: 0,
                        br_srebrnih: 0,
                        osvajaci: [],
                        sportovi_disc: []
                    });
                    med.save().then((odg) => { }).catch((err) => console.log(err));
                }
            });
        };
    }
}
exports.VodjaController = VodjaController;
//# sourceMappingURL=vodja.controller.js.map