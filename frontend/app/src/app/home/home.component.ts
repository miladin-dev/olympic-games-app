import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { MedaljeClass } from '../classes/medaljeClass';
import { SportClass } from '../classes/sportClass';
import { TakmicarClass } from '../classes/takmicarClass';
import { TakmicenjeClass } from '../classes/takmicenjeClass';
import { UserClass } from '../classes/userClass';
import { HomeService } from '../home.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private ruter: Router, private home_service : HomeService, private fb : FormBuilder, private m_user_service : UserService ) { }

  svi_takmicari : TakmicarClass[];
  sve_medalje : MedaljeClass[];
  sve_zemlje : Array<string> = [];
  svi_sportovi : SportClass[] = [];
  svi_sportovi_noDuplicates : Array<string> = [];
  table_content_1 = [];
  pregled_osvojenih_medalja = [];
  zavrsena_takmicenja : TakmicenjeClass[] = [];

  form_pretragaTakmicara : FormGroup;
  selected_sport : string;
  selected_disc : string;
  moguce_disc : Array<string> = [];

  chartt : Chart;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  //Registration Login
  form_registracija : FormGroup;
  form_login : FormGroup;
  form_promena_loz : FormGroup;
  err_msg : string;
  err_msg_promena_loz : string;
  err_msg_login : string;
  password_rxp = '(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){3,})(?=(?:.*\\d){2,})(?=(?:.*[-+_!@#$%^&*.,?]){2,})(?=(.)\\1{0,3})^[a-zA-Z][a-zA-Z\\d-+_!@#$%^&*.,?]{7,11}$';
  

  ngOnInit(): void {
    // this.chartt.destroy();
    this.home_service.dohvati_sva_zavrsena_takmicenja().subscribe((odg : TakmicenjeClass[]) => {
      this.zavrsena_takmicenja = odg;
    })
    this.init_form();
    this.init_sve_takmicare();
    this.init_sve_medalje();
    this.init_sve_sportove();
  }

  init_form()
  {
    this.form_pretragaTakmicara = this.fb.group({
      ime_prezime : "",
      zemlja : 'Sve zemlje',
      sport : 'Svi sportovi',
      disciplina : 'Sve discipline',
      pol : "-",
      samo_osvajaci_medalja : false
    });

    this.form_registracija = this.fb.group({
      korime : "",
      lozinka : ["", [Validators.pattern(this.password_rxp)]],
      potvrda_loz : ["", [Validators.pattern(this.password_rxp)]],
      ime : "",
      prezime : "",
      zemlja: "Izaberite nacionalnost",
      mail : ["", Validators.email],
      tip : "Tip korisnika"
    }, {validator: this.matchingPasswords('lozinka', 'potvrda_loz')});

    this.form_login = this.fb.group({
      korime: ["", [Validators.required]],
      lozinka : ["", [Validators.pattern(this.password_rxp)]],
      tip : "Tip korisnika"
    });

    this.form_promena_loz = this.fb.group({
      korime : "",
      stara_loz : ["", [Validators.pattern(this.password_rxp)]],
      lozinka : ["", [Validators.pattern(this.password_rxp)]],
      potvrda_loz : ["", [Validators.pattern(this.password_rxp)]],
    }, {validator: this.matchingPasswords('lozinka', 'potvrda_loz')}
    )
  }

  get stara_loz()
  {
    return this.form_promena_loz.get('stara_loz');
  }
  get nova_loz()
  {
    return this.form_promena_loz.get('lozinka');
  }

  get potvrda_nove()
  {
    return this.form_promena_loz.get('potvrda_loz');
  }

  get korime_FormLogin()
  {
    return this.form_login.get('korime');
  }

  get lozinka_login()
  {
    return this.form_login.get('lozinka');
  }

  get lozinka_reg()
  {
    return this.form_registracija.get('lozinka');
  }
  get potvrda_loz()
  {
    return this.form_registracija.get('potvrda_loz');
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
  
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  notmatchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
  
      if (password.value === confirmPassword.value) {
        return {
          notmismatchedPasswords: true
        };
      }
    }
  }


  ngPromenaLozinke()
  {
    let korime = this.form_promena_loz.get('korime').value;
    let nova = this.form_promena_loz.get('lozinka').value;
    let stara = this.form_promena_loz.get('stara_loz').value;
    this.m_user_service.promena_lozinke(korime, stara, nova).subscribe((odg) => {
      if(odg['message'] == 'ok')
      {
        this.err_msg_promena_loz = 'Lozinka je uspešno promenjena.';
        document.getElementById('div-promena-lozinke').classList.add('is-hidden');
        document.getElementById('div-prijava').classList.remove('is-hidden');
      }
      else
      {
        this.err_msg_promena_loz = 'Neispravno uneti podaci, pokušati ponovo.';
      }
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
        if(odg.odobren == 0)
        {
          this.err_msg_login = 'Korisnik nije odobren u sistemu od strane organizatora.';
        }
        else
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
      }
      else
      {
        this.err_msg_login = 'Neispravni podaci, pokušati ponovo.';
      }
    })
  }

  init_sve_sportove()
  {
    this.home_service.dohvati_sve_sportove().subscribe((odg : SportClass[]) => {
      this.svi_sportovi = odg;

      this.svi_sportovi.forEach((sport_obj ) => {
        let found = false;
        this.svi_sportovi_noDuplicates.forEach((sport) => {
          if(sport_obj.sport == sport)
          {
            found = true;
          }
        })

        if(found == false)
        {
          this.svi_sportovi_noDuplicates.push(sport_obj.sport);
        }
      })
    })
  }

  onChange_izaberi_sport()
  {
    this.moguce_disc = [];
    this.selected_sport = this.form_pretragaTakmicara.get('sport').value;

    this.svi_sportovi.forEach((sport_obj) => {
      if(sport_obj.sport == this.selected_sport)
      {
        this.moguce_disc = this.moguce_disc.concat(sport_obj.disciplina);
      }
    })
  }

  init_sve_takmicare()
  {
    this.home_service.dohvati_sve_takmicare().subscribe((odg : TakmicarClass[]) => {
      this.svi_takmicari = odg;
      this.init_table_content();
    });
  }

  chart_medalje = [];
  chart_zemlje = [];

  public barChartOptions = {
    scaleShowVerticalLines : false,
    responsivne : true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  } 

  public barChartLine = 'line';
  public barChartBar = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  public lineChartData = [];

  chart_x_osa = [];
  chart_data = [];
  chart_labela = [];

  show_chart = false;


  init_grafove()
  {
    this.sve_medalje.forEach(med => {
      this.chart_medalje.push(med.br_bronzanih + med.br_srebrnih + med.br_zlatnih);
      this.chart_zemlje.push(med.zemlja);
    });

    this.lineChartData.push(
      {
        data: this.chart_medalje, label: 'Broj medalja'
      }   
    );

    this.zavrsena_takmicenja.forEach(takm => {
      let sport_disc = takm.sport + ' | ' + takm.disciplina;
      this.chart_x_osa.push(sport_disc);
    })

    console.log(this.chart_x_osa);

    for(let x = 0; x < this.sve_medalje.length; x++)
    { //Sve mgouce zemlje
      this.chart_data = [];
      this.chart_labela = [];


      

      //Sve moguce discipline i sportovi
      this.chart_x_osa.forEach(x_osa => {
        let found = false;
        
        //Sad iteriram kroz sve discipline kod kojih je ostvarena medalja
        this.sve_medalje[x].sportovi_disc.forEach(sp =>{
          if(sp.sport_disc == x_osa)
          {
            found = true;
            this.chart_data.push(sp.medalje);
          }
        }) 
        
          if(!found)
          {
            this.chart_data.push(0);
          }

      })

      this.chart_labela.push(this.sve_medalje[x].zemlja);
      this.barChartData.push({data : this.chart_data, label: this.chart_labela});
    }





    console.log('CHART LABELE');
    console.log(this.chart_labela);
    console.log("CHART DATA");
    console.log(this.chart_data);
 

    // for(let i = 0; i < this.chart_labela.length; i++)
    // {
    //   this.barChartData.push(
    //     {data : [this.chart_data[i]], label: this.chart_labela[i]}
    //   );
    // }

    console.log(this.barChartData);

    this.show_chart = true;
  }

  

  init_sve_medalje()
  {
    this.home_service.dohvati_sve_medalje().subscribe((odg : MedaljeClass[]) => {
      this.sve_medalje = odg;

      this.init_grafove();
      this.init_pregled_osvojenih_medalja();
    });
  }

  init_pregled_osvojenih_medalja()
  {
    this.sve_medalje.sort((a,b) => {
      let a_cnt = (a.br_zlatnih + a.br_srebrnih + a.br_bronzanih);
      let b_cnt = (b.br_zlatnih + b.br_srebrnih + b.br_bronzanih)
      if(a_cnt > b_cnt) return -1;
      if(a_cnt < b_cnt) return 1;
      else return 0;
    })

    this.sve_medalje.forEach((med, i) => {
      let cnt = med.br_zlatnih + med.br_srebrnih + med.br_bronzanih;
      this.pregled_osvojenih_medalja.push({'rang' : (i + 1), 'zemlja' : med.zemlja, 'br_zlatnih' : med.br_zlatnih, 'br_srebrnih' : med.br_srebrnih, 'br_bronzanih' : med.br_bronzanih,
      'ukupan_br' : cnt});
    })
  }

  init_table_content()
  {
    for(let i = 0; i < this.svi_takmicari.length; i++)
    {
      let found = false;
      let found_index;
      for(let x = 0; x < this.table_content_1.length; x++)
      {
        if(this.table_content_1[x].zemlja == this.svi_takmicari[i].drzava)
        {
          found = true;
          found_index = x;
        }
      }

      if(found)
      {
        this.table_content_1[found_index].broj = this.table_content_1[found_index].broj + 1;
      }
      if(!found)
      {
        this.table_content_1.push({'slika' : '../../assets/' + this.svi_takmicari[i].drzava + '.png', 'zemlja' : this.svi_takmicari[i].drzava, 'broj' : 1});
        this.sve_zemlje.push(this.svi_takmicari[i].drzava);
      }
    }
  }

  pronadjeni_takmicari : TakmicarClass[] = [];
  pagination_length;
  pagArr = [];

  onClick_pretrazi()
  {
    let ime_prezime = this.form_pretragaTakmicara.get('ime_prezime').value;
    let zemlja = this.form_pretragaTakmicara.get('zemlja').value;
    let sport = this.form_pretragaTakmicara.get('sport').value;
    let disc = this.form_pretragaTakmicara.get('disciplina').value;
    let pol = this.form_pretragaTakmicara.get('pol').value;
    let samo_osvajaci = this.form_pretragaTakmicara.get('samo_osvajaci_medalja').value;

    console.log(ime_prezime, pol, samo_osvajaci);

    
    this.home_service.pretraga_takmicara(ime_prezime, sport, disc, pol, zemlja, samo_osvajaci).subscribe((odg : TakmicarClass[]) => {
      this.pronadjeni_takmicari = odg;
      document.getElementById('div-pretraga').classList.add('is-hidden');
      document.getElementById('div-lista-takmicara').classList.remove('is-hidden');
      this.pagination_length = this.pronadjeni_takmicari.length;
      this.pagination_length = Math.ceil(this.pagination_length/this.rows_per_page);

      this.pagArr = [];
      for(let i = 0; i < this.pagination_length; i++)
      {
        this.pagArr.push(i+1);
      }

      // setTimeout((odg) => {
      //   //document.getElementById('li-1').classList.add('is-current');
      //   this.paginate(0);
      // }, 200);

      this.paginate(0);
      console.log(this.pagination_length);
      console.log(this.pronadjeni_takmicari);
    })


  }

  rows_per_page = 10;
  paginatedItems;
  last_selected_page = 1;

  result_per_page(i)
  {
    this.rows_per_page = i;
    this.pagArr = [];
    this.pagination_length = this.pronadjeni_takmicari.length;
    this.pagination_length = Math.ceil(this.pagination_length/this.rows_per_page);
    for(let i = 0; i < this.pagination_length; i++)
    {
      this.pagArr.push(i+1);
    }

    this.paginate(0);
  }

  paginate(i)
  {
    let start = i*this.rows_per_page;
    let end = start + this.rows_per_page;
    this.paginatedItems = this.pronadjeni_takmicari.slice(start, end);
    //document.getElementById('li-' + this.last_selected_page).classList.remove('is-current');
    //document.getElementById('li-' + (i+1)).classList.add('is-current');
    this.last_selected_page = i + 1;
  }

  show_content(i)
  {
    let active_tab = 'a-' + i;
    let content = 'div-' + i;

    let hero_telo = document.querySelector('#hero-telo');
    let containers = hero_telo.querySelectorAll('div.container');

    let hero_futer = document.querySelector('#hero-futer');
    let tabs = hero_futer.querySelectorAll('li');

    tabs.forEach(t => {
      if(t.classList.contains('is-active'))
      {
        t.classList.remove('is-active');
      }
    })

    containers.forEach((c) => {
      if(!c.classList.contains('is-hidden'))
      {
        c.classList.add('is-hidden');
      }
    })

    if(i == -1)
    {
      document.getElementById('button-' + '1').classList.add('is-active');
      document.getElementById('div-registracija').classList.remove('is-hidden');
    }
    else if(i == -2)
    {
      document.getElementById('button-' + '2').classList.add('is-active');
      document.getElementById('div-prijava').classList.remove('is-hidden');
    }
    else if(i == -3)
    {
      document.getElementById('button-' + '3').classList.add('is-active');
      document.getElementById('div-promena-lozinke').classList.remove('is-hidden');
    }
    else {
      if(i == 3)
      {
        if(document.getElementById('div-pretraga').classList.contains('is-hidden'))
        {
          document.getElementById('div-pretraga').classList.remove('is-hidden');
        }
        if(!document.getElementById('div-lista-takmicara').classList.contains('is-hidden'))
        {
          document.getElementById('div-lista-takmicara').classList.add('is-hidden');
        }
      }
      if(i != 0)
      document.getElementById(active_tab).classList.add('is-active');
      document.getElementById(content).classList.remove('is-hidden');
    }
    
  }

}
