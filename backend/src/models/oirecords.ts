import mongoose from 'mongoose';

const RecordsSchema = mongoose.Schema;


let Record = new RecordsSchema({
    mesto_godina: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    takmicar: {
        type: String
    },
    drzava: {
        type: String
    },
    rezultat: {
        type: String
    }
});

export default mongoose.model('Record', Record, 'rekordi');