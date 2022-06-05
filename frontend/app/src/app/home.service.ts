import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  constructor(private http : HttpClient) { }

  
  uri = 'http://localhost:4000';

  dohvati_sve_takmicare()
  {
    return this.http.get(`${this.uri}/home/dohvatiSveTakmicare`);
  }

  dohvati_sve_medalje()
  {
    return this.http.get(`${this.uri}/home/dohvatiSveMedalje`);
  }
  
  dohvati_sve_sportove()
  {
    return this.http.get(`${this.uri}/home/dohvatiSveSportove`);
  }
  pretraga_takmicara(ime_prezime, sport, disc, pol, zemlja, samo_osvajaci)
  {
    const data = {
      ime_prezime : ime_prezime,
      sport : sport,
      disc : disc,
      pol : pol,
      zemlja : zemlja,
      samo_osvajaci : samo_osvajaci
    }
    return this.http.post(`${this.uri}/home/pretraziTakmicare`, data);
  };

  dohvati_sva_zavrsena_takmicenja()
  {
    return this.http.get(`${this.uri}/home/dohvatiSvaZavrsenaTakmicenja`);
  }
}
