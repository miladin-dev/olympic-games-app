import express from 'express';
import Takmicar from '../models/participant';
import Team from '../models/team';
import Sportovi from '../models/sport';
import Medalje from '../models/medalje';

export class VodjaController{

    insertParticipant = (req : express.Request, res : express.Response) => {
        let takmicar = new Takmicar(req.body);
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let drzava = req.body.drzava;
        let pol = req.body.pol;
        let sport = req.body.sport;
        let disc = req.body.disciplina;

        console.log('insertParticipant');
        console.log(disc);

        Takmicar.findOne({'ime' : ime, 'prezime' : prezime, 'drzava' : drzava, 'pol' : pol, 'sport' : sport, 'disciplina' : disc}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json({'message' : 'Takmicar je vec prijavljen za datu disciplinu.'});
            }
            else 
            {
                Takmicar.findOne({'ime' : ime, 'prezime' : prezime, 'drzava' : drzava, 'pol' : pol, 'sport' : sport}, (err, odg) => {
                    if(err) console.log(err);
                    if(odg)
                    {
                        //samo pushuj
                        Takmicar.collection.updateOne({'ime' : ime, 'prezime' : prezime, 'drzava' : drzava, 'pol' : pol, 'sport' : sport}, {$push : {'disciplina' : disc}});
                        res.json({'message' : 'Takmicaru je unesena disciplina.'})
                    }
                    else {
                        //savuj takmicara jer ne postoji
                        takmicar.save().then((takmicar) => {
                            res.status(200).json({'message' : 'Takmicar je dodat.'});
                        }).catch((err) => {
                            res.status(400).json({'message' : err});
                        });
                    }
                })
            }


        })
        
    };

    insertDiscipline = (req : express.Request, res : express.Response) => {
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let disciplina = req.body.disciplina;

        Takmicar.findOne({'ime' : ime, 'prezime' : prezime}, (err, korisnik) => {
            if(err) console.log(err);
            if(korisnik) {
                Takmicar.collection.updateOne({'ime' : ime, 'prezime' : prezime}, {"$push" : {"disciplina" : disciplina}});
            }
        })
    }


    insertTeam = (req : express.Request, res : express.Response) => {
        let ekipa = new Team(req.body);
        let ekipni_sport = req.body.sport;
        let ekipna_disc = req.body.disciplina;
        let ekipna_drz = req.body.drzava;
        let broj_igraca : string;

        if(!ekipna_disc){
            Sportovi.findOne({
                'sport' : ekipni_sport,
                'disciplina' : {$size : 0},
                'vrsta' : 'ekipni'
            }, (err, odg) => {
                if(err) console.log(err);
                if(odg) {
                    broj_igraca = odg.toObject().br_igraca;
                    console.log("BROJ IGRACA " + broj_igraca); 
                }
            }) 
        } else {
            console.log("//2");
            console.log(ekipna_disc);
            Sportovi.findOne({
                'sport' : ekipni_sport,
                'disciplina' : ekipna_disc,
                'vrsta' : 'ekipni'
                }, (err, odg) => {
                    if(err) console.log(err);
                    if(odg){
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

        Takmicar.find({
            'sport' : ekipni_sport,
            'disciplina' : ekipna_disc,
            'drzava' : ekipna_drz}, (err, odg) =>{
            if(odg.length >= 4) {

                Team.findOne({
                    'sport' : ekipni_sport,
                    'disciplina' : ekipna_disc
                }, (err, odg) => {
                    if(err) console.log(err);
                    if(odg) {
                        Team.collection.updateOne({'sport' : ekipni_sport,'disciplina' : ekipna_disc}, {"$push" : {"drzava" : ekipna_drz}});
                    } else {
                        ekipa.save().then((ekipa) => {
                            res.status(200).json({'message' : 'team added'});
                        }).catch((err) => {
                            res.status(400).json({'message' : err});
                        })
                    }
                })
            }    

        });

    }


    dohvati_sportove = (req : express.Request, res : express.Response) => {
        
        Sportovi.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })

    }

    dohvati_discipline = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let vrsta = req.body.vrsta;

        Sportovi.find({'sport' : sport, 'vrsta' : vrsta}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    };

    unesi_ekipu = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disciplina;
        let drzava = req.body.drzava;
        let konkurencija = req.body.konkurencija;


        console.log(disc + ' unesi_ekipu');
        Team.findOne({'sport' : sport, 'disciplina' : disc, 'konkurencija' : konkurencija}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Team.collection.updateOne({'sport' : sport, 'disciplina' : disc, 'konkurencija' : konkurencija}, {$push : {'drzava' : drzava}});
                res.json({'message' : 'Dodata disciplina.'});
            }
            else 
            {
                let team = new Team(req.body);

                team.save().then(odg => res.json({'message' : 'Dodat tim.'}))
                .catch((err) => console.log(err));
            }
        })
    };

    dohvati_broj_takmicara = (req : express.Request, res : express.Response) => {
        let drz = req.body.drzava;

        Takmicar.find({'drzava' : drz}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg.length);
            }
        })
    
    }

    dohvati_moje_takmicare = (req : express.Request, res : express.Response) => {
        let drz = req.body.drzava;

        Takmicar.find({'drzava' : drz}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    
    }

    formiraj_medalje_sablon = (req : express.Request, res : express.Response) => {
        let drz = req.body.drzava;

        Medalje.findOne({'zemlja' : drz}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {

            }
            else
            {
                let med = new Medalje({
                    zemlja : drz,
                    br_zlatnih : 0,
                    br_bronzanih : 0,
                    br_srebrnih : 0,
                    osvajaci : [],
                    sportovi_disc : []
                })

                med.save().then((odg) => {}).catch((err) => console.log(err));
            }
        })
    
    }
}