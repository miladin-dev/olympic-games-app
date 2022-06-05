"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const takmicenje_1 = __importDefault(require("../models/takmicenje"));
const medalje_1 = __importDefault(require("../models/medalje"));
const participant_1 = __importDefault(require("../models/participant"));
const sport_1 = __importDefault(require("../models/sport"));
class HomeController {
    constructor() {
        this.dohvati_sve_takmicare = (req, res) => {
            participant_1.default.find({}, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.dohvati_sve_medalje = (req, res) => {
            medalje_1.default.find({}, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
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
        this.pretrazi = (req, res) => {
            let ime_prezime = req.body.ime_prezime;
            let ime;
            let prezime;
            let pol = req.body.pol;
            let disc = req.body.disc;
            let sport = req.body.sport;
            var query = {};
            let zemlja = req.body.zemlja;
            let osvajaci = req.body.samo_osvajaci;
            if (ime_prezime != "") {
                ime = ime_prezime.split(' ')[0];
                prezime = ime_prezime.split(' ')[1];
                query["ime"] = ime;
                query["prezime"] = prezime;
            }
            if (pol != '-') {
                query["pol"] = pol;
            }
            if (sport != 'Svi sportovi') {
                query["sport"] = sport;
            }
            if (disc != 'Sve discipline') {
                query["disciplina"] = disc;
            }
            if (zemlja != 'Sve zemlje') {
                query["drzava"] = zemlja;
            }
            if (osvajaci == true) {
                query["ima_medalju"] = "da";
            }
            participant_1.default.find(query, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                    console.log(odg);
                }
            });
        };
        this.dohvati_sva_zavrsena_takmicenja = (req, res) => {
            takmicenje_1.default.find({ 'kraj': 1 }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map