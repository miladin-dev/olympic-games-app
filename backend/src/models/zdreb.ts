import mongoose from 'mongoose';

let ZdrebSchema = mongoose.Schema;

let Zdreb = new ZdrebSchema({
    id_tak : {
        type : Number
    },
    ekipa : {
        type : String
    },
    br_p : {
        type : Number
    },
    bodovi : {
        type : Number
    },
    rang : {
        type : Number
    },
    grupa : {
        type : String
    }
});

export default mongoose.model('Zdreb', Zdreb, 'zdreb');