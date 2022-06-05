"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizatorController = void 0;
const user_1 = __importDefault(require("../models/user"));
const sport_1 = __importDefault(require("../models/sport"));
const oirecords_1 = __importDefault(require("../models/oirecords"));
const takmicenje_1 = __importDefault(require("../models/takmicenje"));
const team_1 = __importDefault(require("../models/team"));
const participant_1 = __importDefault(require("../models/participant"));
class OrganizatorController {
    constructor() {
        this.dohvati_neodobrene_korisnike = (req, res) => {
            user_1.default.find({ 'odobren': 0 }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
                else {
                }
            });
        };
        this.odobri_korisnike = (req, res) => {
            user_1.default.find({ 'korime': req.body.korime }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    user_1.default.collection.updateOne({ 'korime': req.body.korime }, { $set: { 'odobren': 1 } });
                    res.json({ 'message': 'odobren' });
                }
            });
        };
        this.unesi_sport = (req, res) => {
            let sport_obj = new sport_1.default(req.body);
            let naziv = req.body.sport;
            let vrsta = req.body.vrsta;
            let br_igraca = req.body.br_igraca;
            console.log(naziv + '-');
            console.log(vrsta + '-');
            sport_1.default.findOne({ 'sport': naziv, 'vrsta': vrsta }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json({ 'message': 'Sport vec postoji.' });
                }
                else {
                    sport_obj.save()
                        .then(odg => res.json({ 'message': 'Sport dodat.' }))
                        .catch(err => console.log(err));
                }
            });
        };
        this.unesi_disciplinu_sportu = (req, res) => {
            let sport = req.body.sport;
            let disc = req.body.disc;
            let vrsta = req.body.vrsta;
            console.log(sport, disc, vrsta);
            sport_1.default.findOne({ 'sport': sport, 'vrsta': vrsta }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    sport_1.default.collection.updateOne({ 'sport': sport, 'vrsta': vrsta }, { $push: { 'disciplina': disc } });
                    res.json({ 'message': 'Uneta disciplina' });
                }
                else {
                    res.json({ 'message': 'Sport ne postoji - vrsta sporta nije dobro izabrana.' });
                }
            });
        };
        this.dohvati_sve_delegate = (req, res) => {
            let user = new user_1.default();
            user_1.default.find({ 'tip': 'delegat' }, (err, delegati) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(delegati);
                }
            });
        };
        this.dohvati_rekorde = (req, res) => {
            let records = new oirecords_1.default();
            oirecords_1.default.find({}, (err, rekordi) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(rekordi);
                }
            });
        };
        this.dohvati_sve_sportove = (req, res) => {
            sport_1.default.find({}, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.unesi_takmicenje = (req, res) => {
            takmicenje_1.default.find({}, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    req.body.id = odg.length + 1;
                    let takmicenje = new takmicenje_1.default(req.body);
                    takmicenje.save().then((takmicenje_obj) => {
                        res.status(200).json({ 'message': 'tamicenje dodato' });
                    }).catch((err) => {
                        res.status(400).json({ 'message': 'tamicenje neuspesno dodato' });
                    });
                }
            });
        };
        this.dohvati_prijavljene_ekipe = (req, res) => {
            let sport = req.body.sport;
            let disc = req.body.disc;
            team_1.default.findOne({ 'sport': sport, 'disciplina': disc }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.dohvati_prijavljene_takmicare = (req, res) => {
            let sport = req.body.sport;
            let disc = req.body.disc;
            participant_1.default.find({ 'sport': sport, 'disciplina': disc }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
    }
}
exports.OrganizatorController = OrganizatorController;
//# sourceMappingURL=organizator.controller.js.map