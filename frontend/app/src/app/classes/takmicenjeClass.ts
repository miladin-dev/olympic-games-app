export class TakmicenjeClass {
    id : number;
    sport : string;
    disciplina : string;
    lokacija : Array<string>;
    datum_od : string;
    datum_do : string;
    format : string;
    delegati : Array<string>;
    ucesnici : Array<string>;
    tip : string;
    konkurencija : string;
    grupa : string; //trenutna grupa
    postoji_raspored : string;
    kraj: number;
}