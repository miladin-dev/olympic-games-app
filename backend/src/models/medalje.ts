import mongoose from 'mongoose';

let MedaljeSchema = mongoose.Schema;

let Medalje = new MedaljeSchema({
    zemlja : {
        type : String
    },
    br_zlatnih : {
        type : Number
    },
    br_bronzanih : {
        type : Number
    },
    br_srebrnih : {
        type : Number
    },
    osvajaci : {
        type : Array
    },
    sportovi_disc : {
        type : Array
    }
});

export default mongoose.model('Medalje', Medalje, 'medalje');
