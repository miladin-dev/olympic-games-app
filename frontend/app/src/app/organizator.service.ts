import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizatorService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  dohvati_neodobrene_korisnike()
  {
    return this.http.get(`${this.uri}/organizator/dohvatiNeodobreneKorisnike`);
  }

  odobri_korisnika(korime)
  {
    const data = {
      korime : korime
    }
    return this.http.post(`${this.uri}/organizator/odobriKorisnika`, data);
  }

  insertSport_service(sport, disciplina, vrsta, br_igraca){
    const data = {
      sport: sport,
      disciplina: disciplina,
      vrsta: vrsta,
      br_igraca: br_igraca
    }
    
    return this.http.post(`${this.uri}/organizator/insertSport`, data);
  };

  unesi_sport(sport, vrsta, br_igraca)
  {
    const data = {
      sport: sport,
      vrsta: vrsta,
      br_igraca: br_igraca
    };

    return this.http.post(`${this.uri}/organizator/unesiSport`, data);
  }

  unesi_disciplinu_sportu(sport, disciplina, vrsta)
  {
    const data = {
      sport : sport,
      disc : disciplina,
      vrsta : vrsta
    };

    return this.http.post(`${this.uri}/organizator/unesiDisciplinuSportu`, data);
  }

  dohvati_sve_delegate(){
    return this.http.get(`${this.uri}/organizator/dohvatiSveDelegate`);
  }

  dohvati_rekorde(){
    return this.http.get(`${this.uri}/organizator/dohvatiRekorde`);
  }

  dohvati_sve_sportove(){
    return this.http.get(`${this.uri}/organizator/dohvatiSveSportove`);
  }

  unesi_takmicenje(sport, disciplina, datum_od, datum_do, lokacija, format, delegati, takmicari, tip, konkurencija, postoji_raspored, grupa)
  {
    
    const data = {
      id : null,
      sport : sport,
      disciplina: disciplina,
      datum_od : datum_od,
      datum_do : datum_do,
      lokacija : lokacija,
      format : format,
      delegati : delegati,
      ucesnici : takmicari,
      tip : tip,
      grupa : grupa,
      konkurencija : konkurencija,
      postoji_raspored : postoji_raspored,
      kraj : 0
    }


    return this.http.post(`${this.uri}/organizator/unesiTakmicenje`, data);
  };


  dohvati_prijavljene_ekipe(sport, disc)
  {
    const data = {
      sport : sport,
      disc : disc
    }

    return this.http.post(`${this.uri}/organizator/dohvatiPrijavljeneEkipe`, data);
  };


  dohvati_prijavljene_takmicare(sport, disc)
  {
    const data = {
    sport : sport,
    disc : disc
    }

    return this.http.post(`${this.uri}/organizator/dohvatiPrijavljeneTakmicare`, data);
  }
}
