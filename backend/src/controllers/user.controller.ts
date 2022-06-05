import e from 'express';
import express from 'express';
import Korisnik from '../models/user'

export class UserController{

    dohvati_sve_korisnike =  (req : express.Request, res : express.Response) => {
        Korisnik.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                res.json(odg);
            }
        })
    }

    register = (req : express.Request, res : express.Response) => {
        let kor = new Korisnik(req.body);
        let ok = true;

  
        Korisnik.findOne({'korime' : req.body.korime}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json({'message' : 'Korisnik sa datim korisničkim imenom već postoji.'});
            }
            else
            {
                if(req.body.tip == 'vodja')
                {
                    Korisnik.findOne({'zemlja' : req.body.zemlja, 'tip' : 'vodja'}, (err, odg) => {
                        if(err) console.log(err);
                        if(odg)
                        {
                            res.json({'message' : 'Vođa nacionalne delegacije za zemlju ' + req.body.zemlja + ' već postoji.'});
                        }
                        else
                        {
                            kor.save().then((kor) => {
                                res.json({'message' : 'user added'});
                            }).catch((err) => {
                                res.json({'message' : err});
                            })
                        }
                    }) 
                }
                else
                {
                    kor.save().then((kor) => {
                        res.json({'message' : 'user added'});
                    }).catch((err) => {
                        res.json({'message' : err});
                    })
                }
            }
        })

    }


    login = (req : express.Request, res : express.Response) => {
        let korime = req.body.korime;
        let lozinka = req.body.lozinka;
        let tip = req.body.tip;


        Korisnik.findOne({'korime' : korime, 'lozinka' : lozinka, 'tip' : tip}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
            else
            {
                console.log('NE nadjen');
                res.json({'message' : 'Neispravni podaci, pokušati ponovo.'});
            }
        })
    };

    promena_lozinke = (req : express.Request, res : express.Response) => {
        
        Korisnik.findOne({'korime' : req.body.korime, 'lozinka' : req.body.stara_loz}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Korisnik.collection.updateOne({'korime' : req.body.korime, 'lozinka' : req.body.lozinka}, {$set : {'lozinka' : req.body.nova_loz}});
                res.json({'message' : 'ok'});
            }
            else
            {
                res.json({'message' : 'not ok'});
            }
        })
    
    }
}