import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DelegatService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';


  dohvati_sve_takmicare()
  {
    return this.http.get(`${this.uri}/delegat/dohvatiSveTakmicare`)
  }


  dohvatiTakmicenja_service(delegat){
    const data = {
      delegat : delegat
    }

    return this.http.post(`${this.uri}/delegat/dohvatiTakmicenja`, data);
  };

  dohvati_sve_rezultate_individ()
  {
    return this.http.get(`${this.uri}/delegat/dohvatiSveRezultateIndivid`);
  }

  unesi_raspored_individ(idTak, datum, vreme, lokacija)
  {
    const data = {
      idTak : idTak,
      datum : datum,
      vreme : vreme,
      lokacija : lokacija
    }

    return this.http.post(`${this.uri}/delegat/unesiRasporedIndividualni`, data)
  };

  //dohvati sve rasporede za individ sportove koji su vec uneti
  dohvati_raspored_individ()
  {
    return this.http.get(`${this.uri}/delegat/dohvatiRasporedIndividualni`);
  };

  dohvati_individ_takmicare(idTak)
  {
    const data = {
      idTak : idTak
    }

    return this.http.post(`${this.uri}/delegat/dohvatiIndividualneTakmicare`, data);
  };

  unesi_rezultat_individ(takmicar, idTak, grupa, rezultat, rang)
  {
    const data = {
      takmicar : takmicar,
      idTak : idTak,
      grupa : grupa,
      rezultat : rezultat,
      rang : rang
    };

    return this.http.post(`${this.uri}/delegat/unesiRezultatIndivid`, data);
  };

  knockout_unesi_rez(nizRezultata, idTak, ind1, ind2)
  {
    const data =
    {
      nizRez : nizRezultata,
      idTak : idTak,
      ind1 : ind1,
      ind2 : ind2
    }

    return this.http.post(`${this.uri}/delegat/unesiKnockoutRezultat`, data);
  }

  set_rezultat_individ(takmicar, idTak, grupa, rezultat)
  {
    const data = {
      takmicar : takmicar,
      idTak : idTak,
      grupa : grupa,
      rezultat : rezultat
    };

    return this.http.post(`${this.uri}/delegat/setIndividRezultat`, data);
  }


  proveraUnetogRezultat_service(idTak, takmicar, grupa)
  {
    const data = {
      idTak : idTak,
      takmicar : takmicar,
      grupa : grupa
    }

    return this.http.post(`${this.uri}/delegat/proveraUnetogRezultata`, data);
  };

  promeni_rang_individ(idRez, rang)
  {
    const data = {
      id : idRez,
      rang : rang
    }

    console.log(idRez + ' iz service-a');

    return this.http.post(`${this.uri}/delegat/promeniRangIndivid`, data);
  }

  promeni_grupu_takmicenju_individ(idTak, grupa){
    const data = {
      idTak : idTak,
      grupa : grupa
    }

    return this.http.post(`${this.uri}/delegat/promeniGrupuTakmicenjuIndivid`, data);
  };

  promeni_grupu_takmicenju_Service(idTak, sport, disc, grupa){
    const data = {
      idTak : idTak,
      sport : sport,
      disciplina : disc,
      grupa : grupa
    }

    return this.http.post(`${this.uri}/delegat/promeniGrupuTakmicenju`, data);
  };

  dohvati_prvih_n_Service(idTak, limit)
  {
    const data = {
      idTak : idTak,
      limit : limit
    }

    return this.http.post(`${this.uri}/delegat/dohvatiPrvihN`, data);
  };

  oznaci_kraj_individ(idTak)
  {
    const data = {
      id : idTak
    }

    return this.http.post(`${this.uri}/delegat/oznaciKrajIndividu`, data);
  };


  
  unesi_medalju_individ(prvo_m, drugo_m, trece_m, takm1, takm2, takm3, sport_disc)
  {
    const data = {
      prvo_m : prvo_m,
      drugo_m : drugo_m,
      trece_m : trece_m,
      takm1 : takm1,
      takm2 : takm2,
      takm3 : takm3,
      sport_disc : sport_disc
    }

    return this.http.post(`${this.uri}/delegat/unesiMedaljuIndivid`, data);
  };

  unos_tenis_rasporeda(idTak, takmicar1, takmicar2, grupna_faza)
  {
    const data = {
      idTak : idTak,
      sport : 'tenis',
      disciplina : 'singl',
      tim1 : takmicar1,
      tim2 : takmicar2,
      br_p1 : -1,
      br_p2 : -1,
      lokacija : 'unused',
      datum : 'unused',
      vreme : 'unused',
      grupna_faza : grupna_faza
      
    }

    return this.http.post(`${this.uri}/delegat/unosTenisRasporeda`, data);
  };

  unos_tenis_rezultata(idTak, takmicar1, takmicar2, br_p1, br_p2, grupna_faza)
  {
    const data = {
      idTak : idTak,
      takmicar1 : takmicar1,
      takmicar2 : takmicar2,
      br_p1 : br_p1,
      br_p2 : br_p2,
      grupna_faza : grupna_faza
    }

    return this.http.post(`${this.uri}/delegat/unosTenisRezultata`, data);
  }


  /*
  *
  *
  * 
  * 
  *  EKIPNI
  * 
  * 
  * 
  * 
  */

  set_ima_medalju_tenis(takm1, takm2, takm3)
  {
    const data = {
      takm1 : takm1,
      takm2 : takm2,
      takm3 : takm3
    }

    return this.http.post(`${this.uri}/delegat/setImaMedaljuTenis`, data)
  }

  set_ima_medalju(sport, drzava1, drzava2, drzava3)
  {
    const data = {
      drzava1 : drzava1,
      drzava2 : drzava2,
      drzava3 : drzava3,
      sport : sport
    }

    return this.http.post(`${this.uri}/delegat/setImaMedalju`, data);
  }

  unos_rasporeda_kola(idTak, sport, disc, grupa_rasporedjeno)
  {
    const data = {
      idTak : idTak,
      sport : sport,
      disciplina : disc,
      grupa_rasporedjeno : grupa_rasporedjeno
    }

    return this.http.post(`${this.uri}/delegat/unosRasporedaKola`, data);
  };

  dohvati_ekipne_rezultate_Service(sport, disc)
  {
    const data = {
      sport : sport,
      disciplina : disc
    }

    return this.http.post(`${this.uri}/delegat/dohvatiEkipneRezultate`, data);
  };

  dohvati_ekipne_rezultate_poIDTAK(idTak)
  {
    const data = {
      idTak : idTak
    }

    return this.http.post(`${this.uri}/delegat/dohvatiEkipneRezPoIdTak`, data)
  }

  unos_satnice(idTak, sport, disc, tim1, tim2, lokacija, datum, vreme, grupa)
  {
    const data = {
      idTak : idTak,
      sport : sport,
      disciplina : disc,
      tim1 : tim1,
      tim2 : tim2,
      lokacija : lokacija,
      datum : datum,
      vreme : vreme,
      grupa : grupa
    };

    return this.http.post(`${this.uri}/delegat/unosSatnice`, data);
  };

  unos_poena(idTak, sport, disc, tim1, tim2, br_p1, br_p2, kolo)
  {
    const data = {
      idTak : idTak,
      sport : sport,
      disciplina : disc,
      tim1 : tim1,
      tim2 : tim2,
      br_p1 : br_p1,
      br_p2 : br_p2,
      gr_faza : kolo
    };

    return this.http.post(`${this.uri}/delegat/unosPoena`, data);
  };


  formiraj_zdreb(id_tak, ekipe_A, ekipe_B)
  {
    const data = {
      id_tak : id_tak,
      ekipe_A : ekipe_A,
      ekipe_B : ekipe_B
    };

    return this.http.post(`${this.uri}/delegat/formirajZdreb`, data);
  };

  update_zdreb(id_tak, pobednik, gubitnik, br_p, br_g)
  {
    const data = {
      id_tak : id_tak,
      pobednik : pobednik,
      gubitnik : gubitnik,
      br_p : br_p,
      br_g : br_g
    }

    console.log('Pobednik ' + pobednik);
    console.log('Gubitnik ' + gubitnik);
    

    return this.http.post(`${this.uri}/delegat/updateZdreb`, data);
  };

  dohvati_sve_zdreb(id_tak)
  {
    const data = {
      id_tak : id_tak
    };

    return this.http.post(`${this.uri}/delegat/dohvatiSveZdreb`, data);
  };

  setTim_eliminaciona_faza(idTak, sport, disc, timA, timB, el_faza)
  {
    const data = {
      idTak : idTak,
      tim1 : timA,
      tim2 : timB,
      sport : sport,
      disc : disc,
      el_faza : el_faza
    };

    return this.http.post(`${this.uri}/delegat//setovanjeTimaEliminacioneFaze`, data);
  };


  //Jos ne koristim
  unesi_raspored_eliminaciona_faza(el_faza)
  {
    const data = {
      el_faza : el_faza
    };

    return this.http.post(`${this.uri}/delegat/unosRasporedaEliminacioneFaze`, data);
  };

  init_eliminacione_utakmice(idTak, sport, disciplina)
  {
    const data = {
      idTak : idTak,
      sport : sport,
      disciplina : disciplina
    }
    return this.http.post(`${this.uri}/delegat/unesiEliminacioneUtakmice`, data);
  };

  dohvati_ekipneRez_za_datu_grupnuFazu(idTak, sport, disc, hasGroup)
  {
    const data = {
      idTak : idTak,
      sport : sport,
      disc : disc,
      hasGroup : hasGroup
    };

    return this.http.post(`${this.uri}/delegat/dohvatiRezultateZaDatuGrupnuFazu`, data);
  };

  unesi_medalje_ekipni(prvo_m, drugo_m, trece_m, sport_disc)
  {
    const data = {
      prvo_m : prvo_m,
      drugo_m : drugo_m,
      trece_m : trece_m,
      sport_disc : sport_disc
    };

    return this.http.post(`${this.uri}/delegat/unesiMedaljuEkipni`, data);
  }

}
