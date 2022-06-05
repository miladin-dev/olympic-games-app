import mongoose from 'mongoose';

let TakmicenjeSchema = mongoose.Schema;

let Takmicenje = new TakmicenjeSchema({
    id : {
        type : Number
    },
    sport:{
        type: String
    },
    disciplina: {
        type: String
    },
    lokacija: {
        type: Array
    },
    datum_od: {
        type: String
    },
    datum_do: {
        type: String
    },
    format: {
        type: String
    },
    delegati: {
        type: Array
    },
    ucesnici: {
        type: Array
    },
    tip : {
        type: String
    },
    grupa: {
        type: String
    },
    konkurencija : {
        type : String
    },
    postoji_raspored : {
        type : String
    },
    kraj : {
        type : Number
    }

});

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenja');