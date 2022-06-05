import mongoose from 'mongoose';


const ParticipantSchema = mongoose.Schema;


let Takmicar = new ParticipantSchema({
    // _id: {
    //     type : String
    // },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: Array
    },
    drzava: {
        type: String
    },
    ima_medalju : {
        type : String
    }
});


export default mongoose.model('Takmicar', Takmicar, 'takmicari');