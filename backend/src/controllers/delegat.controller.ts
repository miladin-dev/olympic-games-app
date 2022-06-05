import express from 'express';
import RezultatEkipni from '../models/rezultatEkipni';
import Rezultat from '../models/rezultat';
import Takmicenje from '../models/takmicenje';
import Zdreb from '../models/zdreb';
import Medalje from '../models/medalje';
import IndividRaspored from '../models/individRaspored';
import Participant from '../models/participant';

export class DelegatController{

    dohvati_sve_takmicare = (req : express.Request, res : express.Response) => {
        Participant.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })

    };

    set_individ_rezultat = (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;
        let takmicar = req.body.takmicar;
        let rezultat = req.body.rezultat;
        let grupa = req.body.grupa;


        Rezultat.findOne({'takmicar' : takmicar, 'idTak' : idTak, 'grupa' : grupa}, (err,odg) => {
            if(err) console.log(err);
            if(odg) {
                Rezultat.collection.updateOne({'takmicar' : takmicar, 'idTak' : idTak, 'grupa' : grupa},{$set : {'rezultat' : rezultat}});
            }
            else {
                res.json({'message' : 'ne postoji'});
            }
        })
    }


    dohvatiTakmicenja = (req : express.Request, res : express.Response) => {
        Takmicenje.find({'delegati' : req.body.delegat}, (err, odg) => {
            if(err) console.log(err);
            if(odg){
                res.json(odg);
            }
        })
    };

    dohvati_individualne_takmicare = (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;

        Takmicenje.findOne({'id' : idTak}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })


    }

    unesi_rezultat_individ = (req : express.Request, res : express.Response) => {
        console.log(req.body.rang);
        Rezultat.find({}, (err, odg)=>{
            if(err) console.log(err);
            else {
                req.body.id = odg.length + 1;
                let rez = new Rezultat(req.body);

                rez.save().then((rez) => {
                    res.json({'message' : 'rezultat unet'});
                }).catch((err) => {
                    //
                })
            }
        })
    };

    knockout_unesi_rezultat = (req : express.Request, res : express.Response) => {
        let takmicar = [];
        let ind1 = parseInt(req.body.ind1);
        let ind2 = parseInt(req.body.ind2);
        let nizRez = req.body.nizRez;
        let length = (req.body.nizRez.length > 3 ? 4 : req.body.nizRez.length);
        
        for(let i = 0; i < length ; i++)
        {
            takmicar.push(nizRez[i].takmicar);
            let rang;
            let rezultat;
            if(i == ind1 || i == ind2)
            {
                rang = (ind1 + 1) + '-' + (ind2+1);
                rezultat = '-';
            }
            else
            {
                rang = i+1;
                rezultat = nizRez[i].rezultat;
            }

            let rez = new Rezultat({
                takmicar : nizRez[i].takmicar,
                idTak : req.body.idTak,
                rezultat : rezultat,
                grupa : 'knockout',
                rang : rang 
            });

            rez.save().then(odg => {}).catch((err) => console.log(err));
        }

        res.json({'message' : 'ok'});

    }

    unesi_raspored_individ = (req : express.Request, res : express.Response) => {

        IndividRaspored.findOne({'idTak' : req.body.idTak}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json({'message' : 'vec postoji raspored'});
            }
            else 
            {
                let indr = new IndividRaspored(req.body);

                indr.save().then((rez) => {
                    //
                }).catch((err) => {
                    //
                })
            }
        })

        
    };

    dohvati_raspored_individ = (req : express.Request, res : express.Response) => {
        
        IndividRaspored.find({}, (err,odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    };

    dohvati_sve_rezultate_individ = (req : express.Request, res : express.Response) => {
        
        Rezultat.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })

    }


    proveraUnetogRezultata = (req : express.Request, res : express.Response) => {
        let takmicar = req.body.takmicar;
        let idTak = req.body.idTak;
        let grupa = req.body.grupa;

        Rezultat.findOne({'takmicar' : takmicar, 'idTak' : idTak, 'grupa' : grupa }, (err,odg) => {
            if(err) console.log(err);
            if(odg) {
                res.json({'message' : 'postoji'});
            }
            else {
                res.json({'message' : 'ne postoji'});
            }
        })
    };

    promeni_rang_individ = (req : express.Request, res : express.Response) => {
        let id = parseInt(req.body.id);
        let rang = req.body.rang;

        
        console.log(id);

        Rezultat.findOne({'id' : id}, (err, odg) => {
            if(err) console.log(err);
            else
            {
                Rezultat.collection.updateOne({'id' : id}, {$set : {'rang' : rang}});
                res.json({'message ' : 'ok'});
            }
        })
        
    }


    promeni_grupu_takmicenju_individ = (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;
        let grupa = req.body.grupa;
        console.log('grupa ' + grupa);

        Takmicenje.findOne({'id' : idTak}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                Takmicenje.collection.updateOne({'id' : idTak}, {$set : {'grupa' : grupa}});
                res.json({'message' : 'grupa takmicenju promenjena'});
            }
            else {
                res.json({'message' : 'grupa takmicenju nije promenjena'});
            }
        })

    };

    dohvati_prvih_n = (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;
        let limit = parseInt(req.body.limit);

        Rezultat.find({'idTak' : idTak}).sort({'rang'  : 'asc'}).limit(8).exec(function(err, odg){
            if(err) console.log(err);
            if(odg) {
                res.json(odg);
            }
        })
    
    }

    promeni_grupu_takmicenju = (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;
        let sport = req.body.sport;
        let disc = req.body.disciplina;
        let grupa = req.body.grupa;
        console.log('grupa ' + grupa);

        Takmicenje.findOne({'idTak' : idTak, 'sport' : sport, 'disciplina' : disc}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                Takmicenje.collection.updateOne({'idTak' : idTak, 'sport' : sport, 'disciplina' : disc}, {$set : {'grupa' : grupa}});
                res.json({'message' : 'grupa takmicenju promenjena'});
            }
            else {
                res.json({'message' : 'grupa takmicenju nije promenjena'});
            }
        })

    };

    sortiraj(sport : string, disc : string) : string
    {
        let rxp_atletika = /(trcanje)|(skok)|(hodanje)|(maraton)/;
        let sort = 'asc';

        if(sport == 'atletika')
        {
            if(rxp_atletika.test(disc)){
                sort = 'asc';
            }
            else 
            {
                sort = 'desc';
            }
        }

        return sort;
    };

    oznaci_kraj_individ = (req : express.Request, res : express.Response) => {
        
        Takmicenje.findOne({'id' : req.body.id}, (err,odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Takmicenje.collection.updateOne({'id' : req.body.id}, {$set : {'kraj' : 1}});
            }
        })


    }

    unesi_medalju_individ =  (req : express.Request, res : express.Response) => {
        let prvo_m = req.body.prvo_m;
        let drugo_m = req.body.drugo_m;
        let trece_m = req.body.trece_m;
        let prvo_m_takmicar = req.body.takm1;
        let drugo_m_takmicar = req.body.takm2;
        let trece_m_takmicar = req.body.takm3;
        let sport_disc = req.body.sport_disc;


        Participant.findOne({'ime' : prvo_m_takmicar.ime, 'prezime' : prvo_m_takmicar.prezime},(err, odg) => {
            if(err) console.log(err)
            if(odg)
            {
                Participant.collection.updateOne({'ime' : prvo_m_takmicar.ime, 'prezime' : prvo_m_takmicar.prezime}, {$set : {'ima_medalju' : 'da'}});
            }
        })
        Participant.findOne({'ime' : drugo_m_takmicar.ime, 'prezime' : drugo_m_takmicar.prezime},(err, odg) => {
            if(err) console.log(err)
            if(odg)
            {
                Participant.collection.updateOne({'ime' : drugo_m_takmicar.ime, 'prezime' : drugo_m_takmicar.prezime}, {$set : {'ima_medalju' : 'da'}});
            }
        })

        Participant.findOne({'ime' : trece_m_takmicar.ime, 'prezime' : trece_m_takmicar.prezime},(err, odg) => {
            if(err) console.log(err)
            if(odg)
            {
                Participant.collection.updateOne({'ime' : trece_m_takmicar.ime, 'prezime' : trece_m_takmicar.prezime}, {$set : {'ima_medalju' : 'da'}});
            }
        })

        Medalje.findOne({'zemlja' : prvo_m}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                console.log('updateovana 1');
                Medalje.collection.updateOne({'zemlja' : prvo_m}, {$inc : {'br_zlatnih' : 1}, $push : {'osvajaci' : prvo_m_takmicar}});

                Medalje.findOne({'zemlja' : prvo_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, (err, odg) => {
                    if(err) console.log(err);
                    if(odg)
                    {
                        Medalje.collection.updateOne({'zemlja' : prvo_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, {$inc : {'sportovi_disc.$.medalje' : 1}});
                    }
                    else
                    {
                        var tmp = {
                            'sport_disc' : sport_disc, 
                            'medalje' : 1
                        };
                        Medalje.collection.updateOne({'zemlja' : prvo_m}, {$push : {"sportovi_disc" : tmp}});
                    }

                    Medalje.findOne({'zemlja' : drugo_m}, (err, odg) => {
                        if(err) console.log(err);
                        if(odg)
                        {
                            console.log('updateovana 2');
                            Medalje.collection.updateOne({'zemlja' : drugo_m}, {$inc : {'br_srebrnih' : 1}, $push : {'osvajaci' : drugo_m_takmicar}});
                            Medalje.findOne({'zemlja' : drugo_m,  'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, (err, odg) => {
                                if(err) console.log(err);
                                if(odg)
                                {
                                    Medalje.collection.updateOne({'zemlja' : drugo_m,  'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, {$inc : {'sportovi_disc.$.medalje' : 1}});
                                }
                                else
                                {
                                    let tmp = {'sport_disc' : sport_disc, 'medalje' : 1};
                                    Medalje.collection.updateOne({'zemlja' : drugo_m}, {$push : {'sportovi_disc' : tmp}});
                                }
                           
                            })

                            Medalje.findOne({'zemlja' : trece_m}, (err, odg) => {
                                if(err) console.log(err);
                                if(odg)
                                {
                                    console.log('updateovana 3');
                                    Medalje.collection.updateOne({'zemlja' : trece_m}, {$inc : {'br_bronzanih' : 1}, $push : {'osvajaci' : trece_m_takmicar}});
                                    Medalje.findOne({'zemlja' : trece_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, (err, odg) => {
                                        if(err) console.log(err);
                                        if(odg)
                                        {
                                            Medalje.collection.updateOne({'zemlja' : trece_m,  'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, {$inc : {'sportovi_disc.$.medalje' : 1}});
                                        }
                                        else
                                        {
                                            let tmp = {'sport_disc' : sport_disc, 'medalje' : 1};
                                            Medalje.collection.updateOne({'zemlja' : trece_m}, {$push : {'sportovi_disc' : tmp}});
                                        }
                                    })
                                }           
                            });
                            
                        }           
                    });
                })
            }           
        });
        
       
        
    }

    unesi_tenis_raspored =  (req : express.Request, res : express.Response) => {
        let rez = new RezultatEkipni(req.body);
        
        rez.save().then((odg) => {res.json({'message' : 'Unet ekipni raspored za ' + req.body.grupna_faza})}).catch(err => console.log(err)); 
    };

    dohvati_ekipne_rez_poIDTak =  (req : express.Request, res : express.Response) => {

        RezultatEkipni.find({'idTak' : req.body.idTak}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    } 

    unesi_tenis_rezultat =  (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;
        let takm1 = req.body.takmicar1;
        let takm2 = req.body.takmicar2;
        let br_p1 = parseInt(req.body.br_p1);
        let br_p2 = parseInt(req.body.br_p2);
        let grupna_faza = req.body.grupna_faza;


        RezultatEkipni.findOne({'idTak' : idTak,'tim1' : takm1, 'tim2' : takm2, 'grupna_faza' : {$regex : grupna_faza}}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                RezultatEkipni.collection.updateOne({'idTak' : idTak,'tim1' : takm1, 'tim2' : takm2, 'grupna_faza' : {$regex : grupna_faza}}, {$set : {'br_p1' : br_p1, 'br_p2' : br_p2}});
                res.json({'message' : 'Tenis rezultat unet'});
            }
        })
        
    }




    /*
    *
    *   EKIPNI
    * 
    * 
    */

    set_ima_medalju_tenis = (req : express.Request, res : express.Response) => {
        let takm1 = req.body.takm1;
        let takm2 = req.body.takm2;
        let takm3 = req.body.takm3;
        let takm1_ime = takm1.split(' ')[0];
        let takm2_ime = takm2.split(' ')[0];
        let takm3_ime = takm3.split(' ')[0];
        let takm1_prezime = takm1.split(' ')[1];
        let takm2_prezime = takm2.split(' ')[1];
        let takm3_prezime = takm3.split(' ')[1];
        

        Participant.findOne({'ime' : takm1_ime , 'prezime' : takm1_prezime}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Participant.collection.updateOne({'ime' : takm1_ime , 'prezime' : takm1_prezime}, {$set : {'ima_medalju' : 'da'}});
            }
        })
        
        Participant.findOne({'ime' : takm2_ime , 'prezime' : takm2_prezime}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Participant.collection.updateOne({'ime' : takm2_ime , 'prezime' : takm2_prezime}, {$set : {'ima_medalju' : 'da'}});
            }
        })

        Participant.findOne({'ime' : takm3_ime , 'prezime' : takm3_prezime}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Participant.collection.updateOne({'ime' : takm3_ime , 'prezime' : takm3_prezime}, {$set : {'ima_medalju' : 'da'}});
            }
        })

        res.json({'message' : 'ok'});


    }

    set_ima_medalju = (req : express.Request, res : express.Response) => {
        let drz1 = req.body.drzava1;
        let drz2 = req.body.drzava2;
        let drz3 = req.body.drzava3;
        let sport = req.body.sport;


        Participant.find({'drzava' : drz1, 'sport' : sport}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                console.log('nadjen unete medalje');
                Participant.collection.updateMany({'drzava' : drz1, 'sport' : sport}, {$set : {'ima_medalju' : 'da'}});
            }
        });

        Participant.find({'drzava' : drz2, 'sport' : sport}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Participant.collection.updateMany({'drzava' : drz2, 'sport' : sport}, {$set : {'ima_medalju' : 'da'}});
            }
        });

        Participant.find({'drzava' : drz3, 'sport' : sport}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                Participant.collection.updateMany({'drzava' : drz3, 'sport' : sport}, {$set : {'ima_medalju' : 'da'}});
            }
        })

        res.json({'message' : 'ok'});

    }

    unes_rasporeda_kola = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let raspored = req.body.grupa_rasporedjeno;

        
        Takmicenje.findOne({'sport' : sport, 'disciplina' : disciplina}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                Takmicenje.collection.updateOne({'sport' : sport, 'disciplina' : disciplina}, {$set : {'postoji_raspored' : 'da', 'grupa' : '1. kolo'}});
                res.json({'message' : 'postoji raspored = da'});
            }
            else {
                res.json({'message' : 'nije nesto dobro sa unos_rasporeda_kola'})
            }
        });
        

        for(let i = 0; i < raspored.length; i++)
        {
            for(let j = 0; j < raspored[i].length; j++)
            {
                // console.log('tim1' + raspored[i][j]['tim1']);
                // console.log('tim2' + raspored[i][j]['tim2']);
                let rez = new RezultatEkipni({
                    idTak : req.body.idTak,
                    sport : sport,
                    disciplina : disciplina,
                    tim1 : raspored[i][j]['tim1'],
                    tim2 : raspored[i][j]['tim2'],
                    grupna_faza : (i+1) + '. kolo',
                    br_p1 : -1,
                    br_p2 : -1,
                    lokacija : "-",
                    datum : "-",
                    vreme : "-"
                });

                rez.save().then(odg => {}).catch((err)=> console.log(err));
            }
        }
    };


    dohvati_ekipne_rezultate = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disciplina;

        RezultatEkipni.find({'sport' : sport, 'disciplina' : disc}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                res.json(odg);
            }
        })
    };


    unos_satnice = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disc;
        let tim1 = req.body.tim1;
        let tim2 = req.body.tim2;
        let lokacija = req.body.lokacija;
        let datum = req.body.datum;
        let vreme = req.body.vreme;
        let grupa = req.body.grupa;

        
        RezultatEkipni.findOne({
            'idTak' : req.body.idTak,
            'sport' : sport,
            'disc' : disc,
            'tim1' : tim1,
            'tim2' : tim2,
            'grupna_faza' : grupa
            
        }, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                RezultatEkipni.collection.updateOne({'idTak' : req.body.idTak, 'sport' : sport, 'disc' : disc, 'tim1' : tim1,'tim2' : tim2, 'grupna_faza' : grupa}, 
                {$set : {'lokacija' : lokacija, 'datum' : datum, 'vreme' : vreme}});

                res.json({'message' : 'satnica uneta'});
            }
            else {
                res.json({'message' : 'satnica nije uneta'});
            }
        })
        
    };


    unos_poena = (req : express.Request, res : express.Response) => {
        let idTak = req.body.idTak;
        let sport = req.body.sport;
        let disc = req.body.disc;
        let tim1 = req.body.tim1;
        let tim2 = req.body.tim2;
        let br_p1 = req.body.br_p1;
        let br_p2 = req.body.br_p2;
        let gr_faza = req.body.gr_faza;

        RezultatEkipni.findOne({
            'idTak' : idTak,
            'sport' : sport,
            'disc' : disc,
            'tim1' : tim1,
            'tim2' : tim2,
            'grupna_faza' : {$regex : gr_faza}
        }, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                RezultatEkipni.collection.updateOne({
                    'idTak' : idTak,
                    'sport' : sport,
                    'disc' : disc,
                    'tim1' : tim1,
                    'tim2' : tim2,
                    'grupna_faza' : {$regex : gr_faza}
                }, {$set : {
                    'br_p1' : br_p1,
                    'br_p2' : br_p2}
                    });

                res.json({'message' : 'poeni uneti' });
            }
            else {
                res.json({'message' : 'nije uneto'});
            }
        })

    
    };


    formiraj_zdreb = (req : express.Request, res : express.Response) => {
        let id_tak = req.body.id_tak;
        let ekipe_A = req.body.ekipe_A;
        let ekipe_B = req.body.ekipe_B;

        let count = ekipe_A.length;
        let curr_ekipa = ekipe_A;
        let arr = ['A', 'B'];
        let arr_cnt = 0;

        for(let x = 0; x < 2; x++)
        {
            for(let i = 0; i < count; i++)
            {
                let zdreb = new Zdreb({
                    id_tak : id_tak,
                    ekipa : curr_ekipa[i],
                    grupa : arr[arr_cnt],
                    br_p : -1,
                    bodovi : 0,
                    rang : 0
                })

                zdreb.save().then((odg) => {
                    
                })
                .catch((err) => {
                    console.log(err)
                });
            }
            curr_ekipa = ekipe_B;
            arr_cnt += 1;
            count = ekipe_B.length
        }
    };


    update_zdreb = (req : express.Request, res : express.Response) => {
        let id_tak = req.body.id_tak;
        let pobednik = req.body.pobednik;
        let gubitnik = req.body.gubitnik;
        let br_p = parseInt(req.body.br_p);
        let br_g = parseInt(req.body.br_g);

        console.log(pobednik + ' ' + br_p);
        console.log(gubitnik + ' ' + br_g);


        Zdreb.findOne({'id_tak' : id_tak, 'ekipa' : pobednik}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                Zdreb.collection.updateOne({'id_tak' : id_tak, 'ekipa' : pobednik}, {$inc : {'br_p' : br_p + 1, 'bodovi' : 2}});
                console.log('da');
            }
        });
        
        
        Zdreb.findOne({'id_tak' : id_tak, 'ekipa' : gubitnik}, (err, odg) => {
            if(err) console.log(err);
            if(odg) {
                Zdreb.collection.updateOne({'id_tak' : id_tak, 'ekipa' : gubitnik}, {$inc : {'br_p' : br_g + 1, 'bodovi' : 1}});
                res.json({'message' : 'zdreb gubitnika unet'});
            }
        });
    };


    dohvati_sve_zdreb = (req : express.Request, res : express.Response) => {
        let id_tak = req.body.id_tak;

        Zdreb.find({'id_tak' : id_tak}, (err, zdrebovi) => {
            if(err) console.log(err);
            if(zdrebovi) {
                res.json(zdrebovi);
            }
        })
    
    };

    init_eliminacione_utakmice = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disciplina;

        for(let x = 0; x < 4; x++)
        {
            let rez = new RezultatEkipni({
                idTak : req.body.idTak,
                sport : sport,
                disciplina : disc,
                tim1 : '-',
                tim2 : '-',
                grupna_faza : 'cetvrtina finala - ' + (x+1),
                br_p1 : -1,
                br_p2 : -1,
                lokacija : "-",
                datum : "-",
                vreme : "-"
            });

            rez.save()
            .then((odg) => {})
            .catch((err) => console.log(err));
        }

        let tmp = 'polufinale - ';
        for(let y = 0; y < 4; y++)
        {
            if(y == 0)
                tmp = 'polufinale - 1'
            if(y == 1)
                tmp = 'polufinale - 2'
            if(y == 2)
                tmp = 'finale';
            if(y == 3)
                tmp = 'trece mesto';

            let rez = new RezultatEkipni({
                idTak : req.body.idTak,
                sport : sport,
                disciplina : disc,
                tim1 : '-',
                tim2 : '-',
                grupna_faza : tmp,
                br_p1 : -1,
                br_p2 : -1,
                lokacija : "-",
                datum : "-",
                vreme : "-"
            });  

            rez.save()
            .then((odg) => {})
            .catch((err) => console.log(err));
        }
    };


    setTim_eliminaciona_faza = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disc;
        let tim1 = req.body.tim1;
        let tim2 = req.body.tim2;
        let grupa_gde_ubacujem = req.body.el_faza;

        RezultatEkipni.findOne({'idTak' : req.body.idTak, 'sport' : sport, 'disciplina' : disc, 'grupna_faza' : grupa_gde_ubacujem}, (err, odg)=>{
            if(err) console.log(err);
            if(odg) {
                RezultatEkipni.collection.updateOne({'idTak' : req.body.idTak, 'sport' : sport, 'disciplina' : disc, 'grupna_faza' : grupa_gde_ubacujem}, {$set : {'tim1' : tim1, 'tim2' : tim2}});
                res.json({'message' : 'setovan tim za elimacionu fazu'});
            }
            else {
                res.json({'message' : 'nije setovan tim za el. fazu'});
            }
        })
    };

    dohvati_ekipnerez_za_datu_grupnuFazu  = (req : express.Request, res : express.Response) => {
        let sport = req.body.sport;
        let disc = req.body.disc;
        let hasGroup : string = req.body.hasGroup;

        if(hasGroup.match(/(cetvrtina finala)|(polufinale)/))
        {
          hasGroup = hasGroup.split(' - ')[0];
          console.log(hasGroup);
        }
        if(hasGroup == 'finale')
        {
            RezultatEkipni.find({'idTak' : req.body.idTak, 'sport' : sport, 'disciplina' : disc, 'grupna_faza' :  hasGroup}, (err, odg) => {
                if(err) console.log(err);
                if(odg) {
                    res.json(odg);
                }
            })
        }
        else
        {
            RezultatEkipni.find({'idTak' : req.body.idTak, 'sport' : sport, 'disciplina' : disc, 'grupna_faza' : {$regex : hasGroup}}, (err, odg) => {
                if(err) console.log(err);
                if(odg) {
                    res.json(odg);
                }
            })
        }
    
    };

    unesi_medalju_ekipni = (req : express.Request, res : express.Response) => {
        let prvo_m = req.body.prvo_m;
        let drugo_m = req.body.drugo_m;
        let trece_m = req.body.trece_m;
        let sport_disc = req.body.sport_disc;
        let sport = sport_disc.split(' | ')[0];

        Medalje.findOne({'zemlja' : prvo_m}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                console.log('updateovana 1');
                Medalje.collection.updateOne({'zemlja' : prvo_m}, {$inc : {'br_zlatnih' : 1}, $push : {'osvajaci' : sport}});
                Medalje.findOne({'zemlja' : prvo_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, (err, odg) => {
                    if(err) console.log(err);
                    if(odg)
                    {
                        Medalje.collection.updateOne({'zemlja' : prvo_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, {$inc : {'sportovi_disc.$.medalje' : 1}});
                    }
                    else
                    {
                        let tmp = {'sport_disc' : sport_disc, 'medalje' : 1};
                        Medalje.collection.updateOne({'zemlja' : prvo_m}, {$push : {'sportovi_disc' : tmp}});
                    }

                    Medalje.findOne({'zemlja' : drugo_m}, (err, odg) => {
                        if(err) console.log(err);
                        if(odg)
                        {
                            console.log('updateovana 2');
                            Medalje.collection.updateOne({'zemlja' : drugo_m}, {$inc : {'br_srebrnih' : 1}, $push : {'osvajaci' : sport}});
                            Medalje.findOne({'zemlja' : drugo_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, (err, odg) => {
                                if(err) console.log(err);
                                if(odg)
                                {
                                    Medalje.collection.updateOne({'zemlja' : drugo_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, {$inc : {'sportovi_disc.$.medalje' : 1}});
                                }
                                else
                                {
                                    let tmp = {'sport_disc' : sport_disc, 'medalje' : 1};
                                    Medalje.collection.updateOne({'zemlja' : drugo_m}, {$push : {'sportovi_disc' : tmp}});
                                }

                                Medalje.findOne({'zemlja' : trece_m}, (err, odg) => {
                                    if(err) console.log(err);
                                    if(odg)
                                    {
                                        console.log('updateovana 3');
                                        Medalje.collection.updateOne({'zemlja' : trece_m}, {$inc : {'br_bronzanih' : 1}, $push : {'osvajaci' : sport}});
                                        Medalje.findOne({'zemlja' : trece_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, (err, odg) => {
                                            if(err) console.log(err);
                                            if(odg)
                                            {
                                                Medalje.collection.updateOne({'zemlja' : trece_m, 'sportovi_disc' : {$elemMatch: {'sport_disc' : sport_disc}}}, {$inc : {'sportovi_disc.$.medalje' : 1}});
                                            }
                                            else
                                            {
                                                let tmp = {'sport_disc' : sport_disc, 'medalje' : 1};
                                                Medalje.collection.updateOne({'zemlja' : trece_m}, {$push : {'sportovi_disc' : tmp}});
                                            }
                                        })
                                    }           
                                });

                            })
                        }           
                    });

                
                
                
                
                })

            }           
        });
        
        

    }

}