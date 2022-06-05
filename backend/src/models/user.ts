import mongoose from 'mongoose';

const UserSchema = mongoose.Schema;

let Korisnik = new UserSchema({
    korime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    zemlja: {
        type: String
    },
    mail: {
        type: String
    },
    tip: {
        type: String
    },
    odobren : {
        type : Number
    }
})

export default mongoose.model('Korisnik', Korisnik, 'korisnici');