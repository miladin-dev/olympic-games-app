import mongoose from 'mongoose';

let IndividRasporedSchema = mongoose.Schema;

let IndividRaspored = new IndividRasporedSchema({
    idTak :
    {
        type : Number
    },
    datum :{
        type : String
    },
    vreme : {
        type : String
    },
    lokacija : {
        type : String
    }
});

export default mongoose.model('IndividRaspored', IndividRaspored, 'individ_raspored');