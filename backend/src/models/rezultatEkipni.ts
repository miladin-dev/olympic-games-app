import mongoose from 'mongoose';

let RezultatEkipniSchema = mongoose.Schema;

let RezultatEkipni = new RezultatEkipniSchema({
    idTak : {
        type : Number
    },
    tim1 : {
        type : String
    },
    tim2 : {
        type : String
    },
    br_p1 : {
        type : Number
    },
    br_p2 : {
        type : Number
    },
    sport : {
        type : String
    },
    disciplina : {
        type : String
    },
    lokacija : {
        type : String
    },
    datum : {
        type : String
    },
    vreme : {
        type : String
    },
    grupna_faza : {
        type : String
    }
});

export default mongoose.model('RezultatEkipni', RezultatEkipni, 'ekipni_rezultati');