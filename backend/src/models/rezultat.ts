import mongoose from 'mongoose';

let RezultatSchema = mongoose.Schema;

let Rezultat = new RezultatSchema({
    id : {
        type : Number
    },
    takmicar : {
        type : String
    },
    idTak :
    {
        type : Number
    },
    // sport : {
    //     type : String
    // },
    // disciplina : {
    //     type : String
    // },
    rezultat : {
        type : String
    },
    grupa : {
        type : String
    },
    rang : 
    {
        type : String
    }
});

export default mongoose.model('Rezultat', Rezultat, 'rezultati');