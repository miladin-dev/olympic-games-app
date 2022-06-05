import mongoose from 'mongoose';


const TeamSchema = mongoose.Schema;



let Team = new TeamSchema({
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    drzava: {
        type: Array
    },
    konkurencija: {
        type : String
    }
});



export default mongoose.model('Team', Team, 'ekipe');