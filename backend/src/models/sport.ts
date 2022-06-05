import mongoose from 'mongoose';

const SportSchema = mongoose.Schema;

let Sportovi = new SportSchema({
    sport: {
        type: String
    },
    disciplina: {
        type: Array
    },
    vrsta: {
        type: String
    },
    br_igraca: {
        type: String
    }
});

export default mongoose.model('Sportovi', Sportovi, 'sportovi');