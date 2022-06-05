
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SportClass } from './classes/sportClass';


@Injectable({
  providedIn: 'root'
})
export class VodjaService {

  constructor(private http: HttpClient) { };

  uri = 'http://localhost:4000';

  insertParticipant_service(ime, prezime, pol, sport, disciplina, drzava){
    const data = {
      ime: ime,
      prezime: prezime,
      pol: pol,
      sport: sport,
      disciplina: disciplina,
      drzava: drzava,
      ima_medalju : 'ne'
    }
    
    return this.http.post(`${this.uri}/vodja/insertParticipant`, data);
  }

  insertTeam_service(sport, disciplina, drzava){
    const data = {
      sport: sport,
      disciplina : disciplina,
      drzava : drzava
    };

    return this.http.post(`${this.uri}/vodja/insertTeam`, data);
  }

  insertDiscipline_service(ime, prezime, disciplina){
    const data = {
      ime: ime,
      prezime : prezime,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/vodja/insertDiscipline`, data);
  };

  init_sportove()
  {
    return this.http.get(`${this.uri}/vodja/dohvatiSportove`);
  };

  init_discipline(selected_sport, vrsta)
  {
    const data = {
      sport : selected_sport,
      vrsta : vrsta
    };

    return this.http.post(`${this.uri}/vodja/dohvatiDiscipline`, data);
  };

  unesi_takmicara(ime, prezime, pol, sport, disciplina, drzava)
  {
    const data = {
      ime: ime,
      prezime: prezime,
      pol: pol,
      sport: sport,
      disciplina: disciplina,
      drzava: drzava,
      ima_medalju : 'ne'
    }
    
    return this.http.post(`${this.uri}/vodja/insertParticipant`, data);
  };

  unesi_ekipu(sport, disc, drzava, konkurencija)
  {
    const data = {
      sport : sport,
      disciplina : disc,
      drzava : drzava,
      konkurencija : konkurencija
    }

    return this.http.post(`${this.uri}/vodja/unesiEkipu`, data);
  };

  dohvati_broj_takmicara(drzava)
  {
    const data = {
      drzava : drzava
    }

    return this.http.post(`${this.uri}/vodja/dohvatiBrojTakmicara`, data);
  };

  dohvati_moje_takmicare(drzava)
  {
    const data = {
      drzava : drzava
    }

    return this.http.post(`${this.uri}/vodja/dohvatiMojeTakmicare`, data);
  }

  formiraj_medalje_sablon(drzava)
  {
    const data = {
      drzava : drzava
    }

    return this.http.post(`${this.uri}/vodja/formirajMedaljeSablon`, data);
  }

}
