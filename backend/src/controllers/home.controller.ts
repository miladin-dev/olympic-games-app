import express from 'express';
import Takmicenje from '../models/takmicenje';
import Medalje from '../models/medalje';
import Takmicar from '../models/participant';
import Sportovi from '../models/sport';

export class HomeController
{
    dohvati_sve_takmicare  = (req : express.Request, res : express.Response) => {
        
        Takmicar.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    };
   
    dohvati_sve_medalje = (req : express.Request, res : express.Response) => {
        
        Medalje.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    };

    dohvati_sve_sportove = (req : express.Request, res : express.Response) => {
        
        Sportovi.find({}, (err, odg) => {
            if(err) console.log(err);
            if(odg)
            {
                res.json(odg);
            }
        })
    };

    pretrazi = (req : express.Request, res : express.Response) => {
        let ime_prezime = req.body.ime_prezime;
        let ime;
        let prezime;
        let pol = req.body.pol;
        let disc = req.body.disc;
        let sport = req.body.sport;
        var query : any  = {};
        let zemlja = req.body.zemlja;
        let osvajaci = req.body.samo_osvajaci;

        if(ime_prezime != "")
        {
            ime = ime_prezime.split(' ')[0];
            prezime = ime_prezime.split(' ')[1];  
            query["ime"] = ime;
            query["prezime"] = prezime;
        }
        if(pol != '-')
        {
            query["pol"] = pol;
        }
        if(sport != 'Svi sportovi')
        {
            query["sport"] = sport;
        }
        if(disc != 'Sve discipline')
        {
            query["disciplina"] = disc;
        }
        if(zemlja != 'Sve zemlje')
        {
            query["drzava"] = zemlja;
        }

        if(osvajaci == true)
        {
            query["ima_medalju"] = "da";
        }

        Takmicar.find(query, (err, odg) => {
            if(err) console.log(err)
            if(odg)
            {
                res.json(odg);
                console.log(odg);
            }
        });

    
    }

    dohvati_sva_zavrsena_takmicenja = (req : express.Request, res : express.Response) => {
    
        Takmicenje.find({'kraj' : 1}, (err, odg) => {
            if(err) console.log(err);
            if(odg) 
            {
                res.json(odg);
            }
        })
    }

}