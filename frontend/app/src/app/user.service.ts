import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  register_service(korime, lozinka, ime, prezime, zemlja, mail, tip){
    const data = {
      korime: korime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      zemlja: zemlja,
      mail: mail,
      tip: tip,
      odobren : 0
    }
    return this.http.post(`${this.uri}/user/registrujKorisnika`, data);
  }

  dohvati_sve_korisnike(){
    return this.http.get(`${this.uri}/user/dohvatiSveKorisnike`);
  }

  login(korime, lozinka, tip)
  {
    const data = {
      korime: korime,
      lozinka: lozinka,
      tip: tip
    }

    return this.http.post(`${this.uri}/user/login`, data);
  };

  promena_lozinke(korime, stara_loz, nova_loz)
  {
    const data = {
      korime : korime,
      stara_loz : stara_loz, 
      nova_loz : nova_loz
    }

    return this.http.post(`${this.uri}/user/promenaLozinke`, data);
  }


}
