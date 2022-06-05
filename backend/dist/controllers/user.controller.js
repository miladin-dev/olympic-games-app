"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.dohvati_sve_korisnike = (req, res) => {
            user_1.default.find({}, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
            });
        };
        this.register = (req, res) => {
            let kor = new user_1.default(req.body);
            let ok = true;
            user_1.default.findOne({ 'korime': req.body.korime }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json({ 'message': 'Korisnik sa datim korisničkim imenom već postoji.' });
                }
                else {
                    if (req.body.tip == 'vodja') {
                        user_1.default.findOne({ 'zemlja': req.body.zemlja, 'tip': 'vodja' }, (err, odg) => {
                            if (err)
                                console.log(err);
                            if (odg) {
                                res.json({ 'message': 'Vođa nacionalne delegacije za zemlju ' + req.body.zemlja + ' već postoji.' });
                            }
                            else {
                                kor.save().then((kor) => {
                                    res.json({ 'message': 'user added' });
                                }).catch((err) => {
                                    res.json({ 'message': err });
                                });
                            }
                        });
                    }
                    else {
                        kor.save().then((kor) => {
                            res.json({ 'message': 'user added' });
                        }).catch((err) => {
                            res.json({ 'message': err });
                        });
                    }
                }
            });
        };
        this.login = (req, res) => {
            let korime = req.body.korime;
            let lozinka = req.body.lozinka;
            let tip = req.body.tip;
            user_1.default.findOne({ 'korime': korime, 'lozinka': lozinka, 'tip': tip }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    res.json(odg);
                }
                else {
                    console.log('NE nadjen');
                    res.json({ 'message': 'Neispravni podaci, pokušati ponovo.' });
                }
            });
        };
        this.promena_lozinke = (req, res) => {
            user_1.default.findOne({ 'korime': req.body.korime, 'lozinka': req.body.stara_loz }, (err, odg) => {
                if (err)
                    console.log(err);
                if (odg) {
                    user_1.default.collection.updateOne({ 'korime': req.body.korime, 'lozinka': req.body.lozinka }, { $set: { 'lozinka': req.body.nova_loz } });
                    res.json({ 'message': 'ok' });
                }
                else {
                    res.json({ 'message': 'not ok' });
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map