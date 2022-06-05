import express from 'express';
import User from '../models/user';
import Sportovi from '../models/sport';
import Record from '../models/oirecords';
import Takmicenje from '../models/takmicenje';
import Team from '../models/team';
import Participant from '../models/participant';

export class OrganizatorController{

    dohvati_neodobrene_korisnike = (req : express.Request, res : express.Response) => {
        
        User.find({'odobren' : 0}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
            else
            {
            }
        })
        
    }

    odobri_korisnike = (req : express.Request, res : express.Response) => {
        
        User.find({'korime' : req.body.korime}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                User.collection.updateOne({'korime' : req.body.korime}, {$set : {'odobren' : 1}});
                res.json({'message' : 'odobren'});
            }
        })
        
    }

    
    unesi_sport = (req : express.Request, res : express.Response) => {
        let sport_obj = new Sportovi(req.body);
        let naziv = req.body.sport;
        let vrsta = req.body.vrsta;
        let br_igraca = req.body.br_igraca;

        console.log(naziv+ '-');
        console.log(vrsta +'-');

        Sportovi.findOne({'sport' : naziv, 'vrsta' : vrsta}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json({'message' : 'Sport vec postoji.'});
            }
            else 
            {
                sport_obj.save()
                .then(odg => res.json({'message' : 'Sport dodat.'}))
                .catch(err => console.log(err));
            }
        });
       
    };

    unesi_disciplinu_sportu = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disc;
        let vrsta = req.body.vrsta;

        console.log(sport, disc, vrsta);

        Sportovi.findOne({'sport' : sport, 'vrsta' : vrsta}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Sportovi.collection.updateOne({'sport' : sport, 'vrsta' : vrsta}, {$push : {'disciplina' : disc}});
                res.json({'message' : 'Uneta disciplina'});
            }
            else {
                res.json({'message' : 'Sport ne postoji - vrsta sporta nije dobro izabrana.'});
            }
        });
    }    

    dohvati_sve_delegate = (req : express.Request, res : express.Response) => {
        let user = new User();

        User.find({'tip' : 'delegat'}, (err, delegati) => {
            if(err){
                console.log(err);
            }
            else {
                res.json(delegati);
            }
        })
    }

    dohvati_rekorde = (req : express.Request, res : express.Response) => {
        let records = new Record();

        Record.find({}, (err, rekordi) => {
            if(err){
                console.log(err);
            }
            else {
                res.json(rekordi);
            }
        })
    };

    dohvati_sve_sportove = (req : express.Request, res : express.Response) => {
        Sportovi.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg){
                res.json(odg);
            }
        })
    };

    unesi_takmicenje = (req : express.Request, res : express.Response) => {
       
        
        Takmicenje.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                req.body.id = odg.length + 1;
                let takmicenje = new Takmicenje(req.body);
                takmicenje.save().then((takmicenje_obj) => {
                    res.status(200).json({'message' : 'tamicenje dodato'})
                }).catch((err) => {
                    res.status(400).json({'message' : 'tamicenje neuspesno dodato'})
                })
            }
        })

        
    };


    dohvati_prijavljene_ekipe = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disc;

        Team.findOne({'sport' : sport, 'disciplina' : disc}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    };

    dohvati_prijavljene_takmicare = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disc;

        Participant.find({'sport' : sport, 'disciplina' : disc}, (err,odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    
    }
}