import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClass } from '../classes/userClass';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private m_user_service: UserService, private fb : FormBuilder, private ruter : Router) { }

  form_registracija : FormGroup;
  form_login : FormGroup;
  err_msg : string;

  ngOnInit(): void {
    this.init_form();
  }

  init_form()
  {
    this.form_registracija = this.fb.group({
      korime : "",
      lozinka : "",
      potvrda_loz : "",
      ime : "",
      prezime : "",
      zemlja: "Izaberite nacionalnost",
      mail : ["", Validators.email],
      tip : "Tip korisnika"
    });

    this.form_login = this.fb.group({
      korime: "",
      lozinka : "",
      tip : "Tip korisnika"
    })
  }

  ngRegister(){
    const korime = this.form_registracija.get('korime').value;
    const lozinka = this.form_registracija.get('lozinka').value;
    const ime = this.form_registracija.get('ime').value;
    const prezime = this.form_registracija.get('prezime').value;
    const zemlja = this.form_registracija.get('zemlja').value;
    const mail = this.form_registracija.get('mail').value;
    const tip = this.form_registracija.get('tip').value;


    this.m_user_service.register_service(korime, lozinka, ime, prezime, zemlja, mail, tip).subscribe((odg) => {
      if(odg['message'] != 'user added')
      {
        this.err_msg = odg['message'];
      }
      else
      {
        this.err_msg = '';
      }
    });
  }

  ngLogin()
  {
    const korime = this.form_login.get('korime').value;
    const lozinka = this.form_login.get('lozinka').value
    const tip = this.form_login.get('tip').value;

    this.m_user_service.login(korime, lozinka, tip).subscribe((odg : UserClass) => {
      if(odg['message'] == null)
      {
        localStorage.setItem('ulogovan', JSON.stringify(odg))
        if(tip == 'vodja')
        {
          this.ruter.navigate(['vodja']); 
        }
        else if(tip == 'delegat')
        {
          this.ruter.navigate(['delegat']);
        }
        else
        {
          this.ruter.navigate(['organizator']);
        }
      }
    })
  }

  

}
