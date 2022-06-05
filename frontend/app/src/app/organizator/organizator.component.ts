import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { EkipaClass } from '../classes/ekipaClass';
import { RecordClass } from '../classes/recordClass';
import { SportClass } from '../classes/sportClass';
import { TakmicarClass } from '../classes/takmicarClass';
import { UserClass } from '../classes/userClass';
import { OrganizatorService } from '../organizator.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private org_service : OrganizatorService, private fb : FormBuilder, private ruter : Router) { };
  
  sport: string;
  disciplina: string;
  vrsta: string;
  br_igraca: string;
  delegati : UserClass[];
  rekordi : RecordClass[];
  showRecords_flag : boolean = false;
  form_takmicenje : FormGroup;
  select_sportovi : SportClass[];  //for select
  select_discipline : Array<string>; //for select
  tip_sporta;

  selected_sport;
  selected_disc;
  selected_vrsta;
  svi_sportovi : SportClass[];
  moguce_discipline : Array<string> = [];
  moguce_ekipe : Array<string> = [];
  moguci_takmicari : TakmicarClass[];
  err_msg;

  ulogovan : UserClass;
  sportovi_no_duplicates : Array<string> = [];

  form_unosSporta : FormGroup;
  form_odobriKorisnika : FormGroup;

  neodobreni_korisnici : UserClass[] = [];

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    console.log(this.ulogovan.zemlja);
    this.init_delegate();
    this.init_form();
    this.init_rekorde();
    this.dohvati_sve_sportove();
    this.dohvati_neodobrene_korisnike();
  };

  odjaviSe()
  {
    localStorage.clear();
    this.ruter.navigate(['']);
  }


  dohvati_neodobrene_korisnike()
  {
    this.org_service.dohvati_neodobrene_korisnike().subscribe((odg : UserClass[]) => {
      this.neodobreni_korisnici = odg;

      this.neodobreni_korisnici.forEach(el => {
        this.addItem_korisnici();
      })
    })
  }

  odobriKorisnike()
  {
    for(let i = this.neodobreni_korisnici.length - 1; i >= 0; i--)
    {
      if(this.korisnici_FormArray.at(i).get('checked').value == true)
      {
        this.org_service.odobri_korisnika(this.neodobreni_korisnici[i].korime).subscribe((odg) => {});
        this.korisnici_FormArray.removeAt(i);
        this.neodobreni_korisnici.splice(i, 1);
      }
    }
  }

  init_rekorde()
  {
    this.org_service.dohvati_rekorde().subscribe((odg : RecordClass[]) => {
      this.rekordi = odg;
    })
  }

  init_delegate()
  {
    this.org_service.dohvati_sve_delegate().subscribe((odg : UserClass[]) => {
      this.delegati = odg;

      for(let i = 0; i < this.delegati.length; i++)
        this.addItem_delegati();

    });
  }

  init_form(){
    this.form_unosSporta = this.fb.group({
      sport : "",
      disciplina : "",
      vrsta : "Izaberite tip sporta",
      br_igraca : ""
    })

    this.form_takmicenje = this.fb.group({
      sport : "Izaberite sport",
      disciplina : "Izaberite disciplinu",
      datum_od : "",
      datum_do : "",
      konkurencija : "Izaberite konkurenciju",
      lokacija : "",
      format : "",
      delegati : this.fb.array([]),
      takmicari : this.fb.array([])
    });

    this.form_odobriKorisnika = this.fb.group({
      korisnici : this.fb.array([])
    })
  
  }

  get korisnici_FormArray()
  {
    return this.form_odobriKorisnika.get('korisnici') as FormArray;
  }

  get takmicari(): FormArray {
    return this.form_takmicenje.get('takmicari') as FormArray;
  }

  get delegati_FormArray() : FormArray {
    return this.form_takmicenje.get('delegati') as FormArray;
  }

  loguj(i)
  {
    console.log(this.takmicari.at(i).get('checked').value);
  }

  createItem() : FormGroup
  {
    return this.fb.group({
      checked : "",
      nosilac : ""
    });
  }

  addItem_korisnici()
  {
    this.korisnici_FormArray.push(this.createItem());
  }

  addItem()
  {
    this.takmicari.push(this.createItem());
  }

  addItem_delegati()
  {
    this.delegati_FormArray.push(this.createItem());
  }

  dohvati_sve_sportove() {
    this.org_service.dohvati_sve_sportove().subscribe((sportovi : SportClass[]) => {
        this.select_sportovi = sportovi;
        this.svi_sportovi = sportovi;

        sportovi.forEach(el => {
          if(!this.sportovi_no_duplicates.includes(el.sport))
          {
            this.sportovi_no_duplicates.push(el.sport);
          }
        })
    })
  }

  onClick_unesi_sport()
  {
    this.selected_sport =  this.form_unosSporta.get('sport').value;
    this.selected_vrsta = this.form_unosSporta.get('vrsta').value;
    let br_igraca = this.form_unosSporta.get('br_igraca').value;

    if(this.selected_vrsta == 'individ')
    {
      br_igraca = 1;
    }

    this.org_service.unesi_sport(this.selected_sport, this.selected_vrsta, br_igraca).subscribe((odg) => {
      console.log(odg['message']);
      if(this.selected_vrsta == 'ekipni' && this.selected_sport != 'tenis' && this.selected_sport != 'atletika') //zbog dubla i atletike stafetnog i to, oni imaju discplinu iako su ekipni
      {
        this.org_service.unesi_disciplinu_sportu(this.selected_sport, '/', this.selected_vrsta).subscribe((odg) => { console.log(odg['message'])});
      }
    })
  };


  onClick_unesi_disc()
  {
    this.selected_sport =  this.form_unosSporta.get('sport').value;
    this.selected_vrsta = this.form_unosSporta.get('vrsta').value;
    const disc = this.form_unosSporta.get('disciplina').value;

    console.log('unos disc');
    console.log(this.selected_sport, this.selected_vrsta);
    
    this.org_service.unesi_disciplinu_sportu(this.selected_sport, disc, this.selected_vrsta).subscribe((odg) => {
      console.log(odg['message']);
    })
  };

  onChange_izaberite_sport()
  {
    this.selected_sport = this.form_takmicenje.get('sport').value;
    this.moguce_discipline = [];
    this.takmicari.clear();
    this.svi_sportovi.forEach(el => {
      if(el.sport == this.selected_sport)
      {
        this.moguce_discipline = this.moguce_discipline.concat(el.disciplina);
      }
    });

  }

  onChange_izaberi_disciplinu()
  {
    this.selected_disc = this.form_takmicenje.get('disciplina').value;
    this.moguce_ekipe = [];
    this.moguci_takmicari = [];
    this.takmicari.clear();

    this.svi_sportovi.forEach(sp => {
      if(sp.disciplina.includes(this.selected_disc))
      {
        this.tip_sporta = sp.vrsta;
      }
    });

    if(this.tip_sporta == 'ekipni')
    {
      this.org_service.dohvati_prijavljene_ekipe(this.selected_sport, this.selected_disc).subscribe((odg : EkipaClass) => {
        this.moguce_ekipe = odg.drzava;

        

        for(let i = 0 ; i < this.moguce_ekipe.length; i++)
        {
          this.addItem();
        }

        console.log(this.moguce_ekipe);
      })
    }
    if(this.tip_sporta == 'individ')
    {
      this.org_service.dohvati_prijavljene_takmicare(this.selected_sport, this.selected_disc).subscribe((odg : TakmicarClass[]) => {
        this.moguci_takmicari = odg;

        console.log(this.moguci_takmicari);
        for(let i = 0 ; i < this.moguci_takmicari.length; i++)
        {
          this.addItem();
        }
        
      })
    }



  }

  ngSubmit_unesi_takmicenje()
  {
    let ucesnici = [];
    let delegati = [];
    let tip;
    let err = 0;
    if(this.tip_sporta == 'individ')
    {
      tip = this.moguci_takmicari;
      for(let i = 0; i < this.takmicari.length; i++)
      {
        if(this.takmicari.at(i).get('checked').value == true)
        {
          if(this.selected_sport == 'tenis')
          {
            ucesnici.push(tip[i].ime + ' ' + tip[i].prezime + ' - '+ this.takmicari.at(i).get('nosilac').value);
          }
          else 
          {
            ucesnici.push(tip[i].ime + ' ' + tip[i].prezime);
          }
        }
      }
    }
    else 
    {
      tip = this.moguce_ekipe;
      for(let i = 0; i < this.moguce_ekipe.length; i++)
      {
        ucesnici.push(this.moguce_ekipe[i]);
      }

    }

    for(let i = 0; i < this.delegati_FormArray.length; i++)
    {
      if(this.delegati_FormArray.at(i).get('checked').value == true)
      {
        delegati.push(this.delegati[i].ime + ' ' + this.delegati[i].prezime);
      }
    }

    let sport = this.form_takmicenje.get('sport').value;
    let disc = this.form_takmicenje.get('disciplina').value;
    let datum_od = this.form_takmicenje.get('datum_od').value;
    let datum_do = this.form_takmicenje.get('datum_do').value;
    let lokacija = this.form_takmicenje.get('lokacija').value;
    let format = this.form_takmicenje.get('format').value;
    let konkurencija = this.form_takmicenje.get('konkurencija').value;
    let grupna_faza;
    let postoji_raspored = 'ne';
  

    if(sport == 'kosarka' || sport == 'odbojka' || sport == 'vaterpolo')
    {
      if(ucesnici.length == 12)
      {
        grupna_faza = '1. kolo';
      }
      if(ucesnici.length == 8)
      {
        grupna_faza = 'cetvrtina finala';
      }
      if(ucesnici.length == 4)
      {
        grupna_faza = 'polufinale';
      }
      if(ucesnici.length > 12)
      {
        this.err_msg = 'Previše prijavljenih ekipa, aksimalno može biti prijavljeno 12.';
        err = 1;
      }

    }
    if(sport == 'streljastvo')
    {
      if(ucesnici.length > 8)
      {
        this.err_msg = 'Maksimalan broj učesnika je 8.';
        err = 1;
      }
      grupna_faza = '1. serija';
    }
    if(sport == 'tenis')
    {
      if(ucesnici.length != 4 && ucesnici.length != 8 && ucesnici.length != 16)
      {
        this.err_msg = 'Broj ucesnika mora biti 4, 8 ili 16.';
        err = 1;
      }
      if(ucesnici.length == 16)
      {
        grupna_faza = 'osmina finala';
      }
      if(ucesnici.length == 8)
      {
        grupna_faza = 'cetvrtina finala';
      }
      if(ucesnici.length == 4)
      {
        grupna_faza = 'polufinale'
      }
    }
    if(sport == 'atletika')
    {
      if(disc.match(/(skok)|(bacanje)/)){
        grupna_faza = '1. serija';
      }
      else if(ucesnici.length > 8)
      {
        grupna_faza = 'kvalifikacije';
      }
      
      else grupna_faza = 'finale';
    }
    
    postoji_raspored = 'ne';

    let lok_arr : Array<string> = lokacija;
    if(lokacija.includes(','))
    {
      lok_arr = lokacija.split(',');
      console.log(lok_arr);
    }
 


    this.org_service.unesi_takmicenje(sport, disc, datum_od, datum_do, lok_arr, format, delegati, ucesnici, 
      this.tip_sporta, konkurencija, postoji_raspored, grupna_faza).subscribe((odg) => {
       
    });
    
  }

  show_content(i)
  {

    if(i == 2 || i == 3)
    {
      this.dohvati_sve_sportove();
      this.dohvati_sve_sportove();
    }
    const hero_telo = document.querySelector('#hero-telo');
    const div_hero_telo = hero_telo.querySelectorAll('div.container');

    div_hero_telo.forEach(el => {
      if(!el.classList.contains('is-hidden')){
        el.classList.add('is-hidden');
      }
    });

    const hero_futer = document.querySelector('#hero-futer');
    const list_item = hero_futer.querySelectorAll('li');
    list_item.forEach(el => {
      if(el.classList.contains('is-active')){
        el.classList.remove('is-active');
      }
    });

    let content_toShow;
    let active_tab;

    content_toShow = 'div-' + i;
    active_tab = 'tab-' + i;

    document.getElementById(content_toShow).classList.remove('is-hidden');
    if(i != 0)
    document.getElementById(active_tab).classList.add('is-active');
  
  }

}
