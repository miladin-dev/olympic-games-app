import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SportClass } from '../classes/sportClass';
import { TakmicarClass } from '../classes/takmicarClass';
import { TakmicenjeClass } from '../classes/takmicenjeClass';
import { UserClass } from '../classes/userClass';
import { VodjaService } from '../vodja.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private vodja_service : VodjaService, private fb : FormBuilder, private ruter : Router) { };

  ime: string;
  prezime: string;
  pol: string;
  sport: string;
  drzava: string;
  disciplina : string;
  ekipa_sport: string;
  ekipa_disciplina: string;
  ekipa_drzava: string;

  nova_disc_ime : string;
  nova_disc_prezime: string;
  nova_disc_disciplina : string;

  form_prijaviTakmicara : FormGroup;
  form_prijaviEkipu : FormGroup;
  form_pregledTakmicara : FormGroup;

  //

  svi_sportovi : Array<SportClass>
  sportovi_no_duplicates : Array<String> = [];
  table_sport_brTakmicara = [];
  individualni_sportovi : Array<SportClass> = [];
  ekipni_sportovi : Array<SportClass> = [];
  sve_discipline : Array<string> = [];
  ekipne_discipline : Array<string> = [];
  discipline_pregled : Array<string> = [];
  selected_sport : string;
  selected_disc : string;
  message : string;
  index_sporta : number;

  ulogovan : UserClass;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    console.log(this.ulogovan.zemlja);
    //kreiraj sablon za medalje za ovu drzavu
    this.init_form();
    this.init_sportove();
    this.init_broj_clanova();
  };

  odjaviSe()
  {
    localStorage.clear();
    this.ruter.navigate(['']);
  }

  init_sportove()
  {
    this.vodja_service.init_sportove().subscribe((sportovi : SportClass[]) => {
      this.svi_sportovi = sportovi;

      this.svi_sportovi.forEach(el => {
        if(el.vrsta == 'individ')
        {
          this.individualni_sportovi.push(el);
        }
        if(el.vrsta == 'ekipni')
        {
          this.ekipni_sportovi.push(el);
        }

        if(!this.sportovi_no_duplicates.includes(el.sport))
        {
          this.sportovi_no_duplicates.push(el.sport);
          this.table_sport_brTakmicara.push({'sport' : el.sport, 'br_takmicara' : 0});
        }
      });
    });

  }

  init_form()
  {
    this.form_prijaviTakmicara = this.fb.group({
      ime : "",
      prezime : "",
      sport : "Izaberite sport",
      disciplina : "Izaberite disciplinu",
      pol : "Izaberite pol",
      drzava : "Obrisati kasnije"
    });

    this.form_prijaviEkipu = this.fb.group({
      sport : "Izaberite sport",
      disciplina : "Izaberite disciplinu",
      pol : "Izaberite pol",
      ekipni_takmicari : this.fb.array([])
    });

    this.form_pregledTakmicara = this.fb.group({
      sport : "Izaberite sport",
      disciplina : "Izaberite disciplinu"
    });

    this.addItem();
  };

  createItem() : FormGroup
  {
    return this.fb.group({
      ime : "",
      prezime : "",
    });
  }
  

  get ekipni_takmicariArray()
  {
    return this.form_prijaviEkipu.get('ekipni_takmicari') as FormArray;
  }

  addItem()
  {
    this.ekipni_takmicariArray.push(this.createItem());
  }

  removeItem(i)
  {
    this.ekipni_takmicariArray.removeAt(i);
  }

  showForm(){
    document.getElementById('imeforme').style.display = 'block';
  }


  prikaz_pocetne_stranice()
  {
    const hero_telo = document.querySelector('#hero-telo');
    const div_hero_telo = hero_telo.querySelectorAll('div.container');

    div_hero_telo.forEach(el => {
      if(!el.classList.contains('is-hidden')){
        el.classList.add('is-hidden');
      }
    });

    document.getElementById('breadcrumb').classList.add('is-hidden');

    const hero_futer = document.querySelector('#hero-futer');
    const list_item = hero_futer.querySelectorAll('li');
    list_item.forEach(el => {
      if(el.classList.contains('is-active')){
        el.classList.remove('is-active');
      }
    });

    document.getElementById('div-0').classList.remove('is-hidden');
  }

  show_content(i)
  {
    this.message = '';
    const hero_telo = document.querySelector('#hero-telo');
    const div_hero_telo = hero_telo.querySelectorAll('div.container');

    div_hero_telo.forEach(el => {
      if(!el.classList.contains('is-hidden')){
        el.classList.add('is-hidden');
      }
    });

    document.getElementById('breadcrumb').classList.add('is-hidden');

    const hero_futer = document.querySelector('#hero-futer');
    const list_item = hero_futer.querySelectorAll('li');
    list_item.forEach(el => {
      if(el.classList.contains('is-active')){
        el.classList.remove('is-active');
      }
    });

    let content_toShow;
    let active_tab;

    if(i == 1)
    {
      content_toShow = 'div-prijava-takmicara';
      active_tab = 'a-prijavi-takmicara';
    }
    if(i == 2)
    {
      content_toShow = 'div-prijava-ekipe';
      active_tab = 'a-prijavi-ekipu';
    }
    if(i == 3)
    {
      this.dohvati_moje_takmicare();
      active_tab = 'a-br-clanova';
      content_toShow = 'div-pregled-br-clanova-tima';
    }
    if(i == 4)
    {
      active_tab = 'a-pregled-clanova';
      content_toShow = 'div-pregled-clanova-tima-1';
      document.getElementById('breadcrumb').classList.remove('is-hidden');
      document.getElementById('breadcrumb-1').classList.add('is-active');
      if(document.getElementById('breadcrumb-2').classList.contains('is-active'))
        document.getElementById('breadcrumb-2').classList.remove('is-active');
    }


    //document.getElementById('div-pocetni-prikaz').classList.replace('is-active', 'is-hidden');
    document.getElementById(content_toShow).classList.replace('is-hidden', 'is-active');
    document.getElementById(active_tab).classList.add('is-active');
  
  };

  onChange_izaberite_sport_individualni()
  {
    this.selected_sport = this.form_prijaviTakmicara.get('sport').value;
    
    this.individualni_sportovi.forEach((sportEl, i) => {
      if(sportEl.sport == this.selected_sport)
      {
        this.index_sporta = i;
        this.sve_discipline = sportEl.disciplina;
      }
    })
  };

  onChange_izaberite_sport_ekipni()
  {
    this.selected_sport = this.form_prijaviEkipu.get('sport').value;
    this.ekipni_sportovi.forEach((sportEl,i) => {
      if(sportEl.sport == this.selected_sport)
      {
        this.index_sporta = i;
        this.ekipne_discipline = sportEl.disciplina;
      }
    });
  }

  onChange_izaberite_disciplinu_individualni()
  {
    this.selected_disc = this.form_prijaviTakmicara.get('disciplina').value;
  };

  onChange_izaberite_disciplinu_ekipni()
  {
    this.selected_disc = this.form_prijaviEkipu.get('disciplina').value;
  }

  ngSubmit_unesi_takmicara()
  {
    let ime = this.form_prijaviTakmicara.get('ime').value;
    let prezime = this.form_prijaviTakmicara.get('prezime').value;
    let pol = this.form_prijaviTakmicara.get('pol').value;

    this.vodja_service.unesi_takmicara(ime, prezime, pol, this.selected_sport, this.selected_disc, this.ulogovan.zemlja).subscribe((res) => {
      this.message = res['message'];
      console.log(res['message']);
    })

    this.formiraj_Medalje_sablon();

  };

  formiraj_Medalje_sablon()
  {
    this.vodja_service.formiraj_medalje_sablon(this.ulogovan.zemlja).subscribe((odg) => {});
  }

  ngSubmit_unesi_ekipu()
  {
    let min_br;
    let max_br;
    let br_igraca = this.ekipni_sportovi[this.index_sporta].br_igraca;
    let br_control = this.ekipni_takmicariArray.length;
    
    console.log(br_control);
    console.log(this.selected_disc);

    if(this.selected_sport == 'kosarka' || this.selected_sport == 'odbojka' || this.selected_sport == 'vaterpolo')
    {
      br_igraca = this.ekipni_sportovi[this.index_sporta].br_igraca;
      min_br = parseInt(br_igraca.split('/')[0]);
      max_br = parseInt(br_igraca.split('/')[1]);
    }
    else {
      min_br = max_br = br_igraca;
    }

    if(min_br <= br_control && max_br >= br_control)
    {
      this.message="Uspesno uneti.";
      let pol = this.form_prijaviEkipu.get('pol').value;
      //unesi u bazu takmicare
      for(let x = 0; x < br_control; x++)
      {
        let ime = this.ekipni_takmicariArray.at(x).get('ime').value;
        let prezime = this.ekipni_takmicariArray.at(x).get('prezime').value;

        this.vodja_service.insertParticipant_service(ime, prezime, pol, this.selected_sport, this.selected_disc, this.ulogovan.zemlja).subscribe((odg) => {
          console.log(odg['message']);
        })
      }

      //unesi ekipu u bazu
      this.vodja_service.unesi_ekipu(this.selected_sport, this.selected_disc, this.ulogovan.zemlja, pol).subscribe((odg) => {
        console.log(odg['message']);
      });

      this.formiraj_Medalje_sablon();

    }
    else {
      this.message = "Broj takmicara ne zadovoljava uslov takmicenja.";
    }
  }

  onClick_nazad_na_pocetnu()
  {
    const hero_telo = document.querySelector('#hero-telo');
    const div_hero_telo = hero_telo.querySelectorAll('div.container');

    div_hero_telo.forEach(el => {
      if(el.classList.contains('is-active')){
        el.classList.replace('is-active', 'is-hidden');
      }
    });

    document.getElementById('div-pocetni-prikaz').classList.replace('is-hidden', 'is-active');
  };

  broj_clanova_tima;

  init_broj_clanova()
  {
    let drzava_vodje = 'Srbija';

    //
    this.vodja_service.dohvati_broj_takmicara(this.ulogovan.zemlja).subscribe((odg) => {
      this.broj_clanova_tima = odg;
      console.log(this.broj_clanova_tima);
    })
  };

  dohvati_moje_takmicare()
  {

    this.vodja_service.dohvati_moje_takmicare(this.ulogovan.zemlja).subscribe((odg : TakmicarClass[]) => {

      for(let i = 0; i < this.table_sport_brTakmicara.length; i++)
      {
        this.table_sport_brTakmicara[i].br_takmicara = 0;

        for(let j = 0; j < odg.length; j++)
        {
          if(this.table_sport_brTakmicara[i].sport == odg[j].sport)
          {
            this.table_sport_brTakmicara[i].br_takmicara++;
          }
        }
      }
    })
  }

  onClick_dalje(i)
  {
    if(i == 1)
    {
      document.getElementById('div-pregled-clanova-tima-1').classList.replace('is-active', 'is-hidden');
      document.getElementById('div-pregled-clanova-tima-2').classList.replace('is-hidden', 'is-active');
      document.getElementById('breadcrumb-1').classList.remove('is-active');
      document.getElementById('breadcrumb-2').classList.add('is-active');
    }
    if(i == 2)
    {
      document.getElementById('div-pregled-clanova-tima-2').classList.replace('is-active', 'is-hidden');
      document.getElementById('div-pregled-clanova-tima-3').classList.replace('is-hidden', 'is-active');
    }
  }

  onChange_izaberite_sport_pregled()
  {
    this.selected_sport = this.form_pregledTakmicara.get('sport').value;
    console.log(this.selected_sport);
    let arr : Array<string> = [];
    this.discipline_pregled = [];

    for(let i = 0; i < this.svi_sportovi.length; i++)
    {
      if(this.svi_sportovi[i].sport == this.selected_sport)
      {
        console.log(this.svi_sportovi[i].disciplina);
        this.discipline_pregled = this.discipline_pregled.concat(this.svi_sportovi[i].disciplina);
      }
    }

    console.log(this.discipline_pregled);
  };

  takmicari_discipline : Array<string> = [];

  onChange_izaberite_disc_pregled()
  {
    this.selected_disc = this.form_pregledTakmicara.get('disciplina').value;

    this.takmicari_discipline = [];
    this.vodja_service.dohvati_moje_takmicare(this.ulogovan.zemlja).subscribe((odg : TakmicarClass[]) => {
      odg.forEach((takmicar) => {
        if(takmicar.disciplina.includes(this.selected_disc) && takmicar.sport == this.selected_sport)
        {
          this.takmicari_discipline.push(takmicar.ime + ' ' + takmicar.prezime);
        }
      })

      console.log(this.takmicari_discipline);
    })
  }






}
