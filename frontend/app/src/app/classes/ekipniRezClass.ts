export class EkipniRezultatiClass {

    constructor(idTak, sport, disciplina, tim1, tim2, gr)
    {
        this.idTak = idTak;
        this.sport = sport;
        this.disciplina = disciplina;
        this.tim1 = tim1;
        this.tim2 = tim2;
        this.br_p1 = -1;
        this.br_p2 = -1;
        this.lokacija = '-';
        this.datum = '-';
        this.vreme = '-';
        this.grupna_faza = gr;
    }

    idTak : number;
    sport : string;
    disciplina : string;
    tim1 : string;
    tim2 : string;
    br_p1 : number;
    br_p2 : number;
    lokacija : string;
    datum : string;
    vreme : string;
    grupna_faza : string;
}