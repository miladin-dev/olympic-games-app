import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EkipniRezultatiClass } from '../classes/ekipniRezClass';
import { IndividRasporedClass } from '../classes/individRasporedClass';
import { RezultatClass } from '../classes/rezultatiClass';
import { TakmicarClass } from '../classes/takmicarClass';
import { TakmicenjeClass } from '../classes/takmicenjeClass';
import { UserClass } from '../classes/userClass';
import { ZdrebClass } from '../classes/zdrebClass';
import { DelegatService } from '../delegat.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private delegat_service : DelegatService, private fb : FormBuilder, private ruter : Router) { }

  ulogovan : UserClass;

  ngOnInit(): void {
    this.ulogovan = JSON.parse(localStorage.getItem('ulogovan'));
    
    this.init_sve_takmicare();
    this.init_form();
    this.init_moja_takmicenja();
  };

  odjaviSe()
  {
    localStorage.clear();
    this.ruter.navigate(['']);
  }

  form_individualniSport : FormGroup;
  form_listaTakmicara : FormGroup;
  form_ekipniSport : FormGroup;
  moja_takmicenja : TakmicenjeClass[];
  takmicari_ind : Array<string>;
  discipline_arr : Array<string> = [];
  discipline_arr_ekipni : Array<string> = [];
  kraj_takmicenja : boolean = true;
  najbolji_rezultati : RezultatClass[];
  html_grupa : string;
  curr_takmicenje_index : number;
  curr_kolo : number;
  kraj_ekipnog_takmicenja : boolean = true;

  content_indivdSportovi_unos_rasporeda = [];
  content_ekipniSportovi = [];
  select_content_IndSp_unos_rez = [];
  takmicariArr = [];
  grupna_faza_individ;
  svi_individ_rezultati : RezultatClass[];
  individ_selected_sport;
  individ_selected_disc;

  svi_takmicari : Array<TakmicarClass> = [];

  init_sve_takmicare(){
    this.delegat_service.dohvati_sve_takmicare().subscribe((odg : TakmicarClass[]) => {
      this.svi_takmicari = odg;
    })
  }

  init_form(){
    this.form_individualniSport = this.fb.group({
      takmicenje : "Izaberite takmicenje",
      sport : "Izaberite sport",
      disc : "Izaberite disciplinu",
      lokacija : "",
      datum : "",
      vreme : "",
      takmicar_rezultat : this.fb.array([]),
      tenis_arr_osmina : this.fb.array([]),
      tenis_arr_cetvrtina : this.fb.array([]),
      tenis_arr_poluf : this.fb.array([]),
      tenis_arr_finale : this.fb.array([]),
      trece_m : this.fb.array([]),
      dinamik : this.fb.array([])
    });

    //ne koristim trenutno
    this.form_listaTakmicara = this.fb.group({
      takmicar : 'Izaberite takmičara',
      rezultat : "",
      takmicar_rezultat : this.fb.array([])
    });

    this.form_ekipniSport = this.fb.group({
      takmicenje : "Izaberite takmicenje",
      sport : "Izaberite sport",
      disc : "Izaberite disciplinu",
      utakmica : "Odaberite utakmicu",
      lokacija : "",
      datum : "",
      vreme : "",
      kolo_1 : this.fb.array([]),
      kolo_2 : this.fb.array([]),
      kolo_3 : this.fb.array([]),
      kolo_4 : this.fb.array([]),
      kolo_5 : this.fb.array([]),
      cetvrtinaf : this.fb.array([]),
      poluf : this.fb.array([]),
      finale : this.fb.array([]),
      trece_mesto : this.fb.array([])
    })
  };

  onTabClick_unos_rez_individSp()
  {
    this.select_content_IndSp_unos_rez = [];
    this.moja_takmicenja.forEach(t => {
      if(t.tip == 'individ' && t.kraj == 0)
        this.select_content_IndSp_unos_rez.push({'id' : t.id, 'sport' : t.sport, 'disciplina' : t.disciplina, 'konk' : t.konkurencija});
    });
 
    this.delegat_service.dohvati_sve_rezultate_individ().subscribe((odg : RezultatClass[]) => {
      this.svi_individ_rezultati = odg;
    });
  }

  show_content(i)
  {

    const hero_futer = document.querySelector('#hero-futer');
    const list_item = hero_futer.querySelectorAll('li');

    if(i == 0)
    {
      document.getElementById('li-0').classList.add('is-hidden');
      list_item.forEach(li => {
        if(!li.classList.contains('is-hidden'))
        {
          li.classList.add('is-hidden');
        }
      });

      document.getElementById('li-1').classList.remove('is-hidden');
      document.getElementById('li-2').classList.remove('is-hidden');
    }
    if(i == 1)
    {
      document.getElementById('li-1').classList.add('is-hidden');
      document.getElementById('li-2').classList.add('is-hidden');
      document.getElementById('li-0').classList.remove('is-hidden');
      document.getElementById('li-3').classList.remove('is-hidden');
      document.getElementById('li-4').classList.remove('is-hidden');

    }
    if(i == 2)
    {
      document.getElementById('li-0').classList.remove('is-hidden');
      document.getElementById('li-1').classList.add('is-hidden');
      document.getElementById('li-2').classList.add('is-hidden');
      document.getElementById('li-5').classList.remove('is-hidden');
      document.getElementById('li-6').classList.remove('is-hidden');
    }
    if(i == 4)
    {
      this.onTabClick_unos_rez_individSp();
    }


    const hero_telo = document.querySelector('#hero-telo');
    const div_hero_telo = hero_telo.querySelectorAll('div.container');

    // div_hero_telo.forEach(el => {
    //   if(el.classList.contains('is-active')){
    //     el.classList.replace('is-active', 'is-hidden');
    //   }
    // });

    div_hero_telo.forEach(el => {
      if(!el.classList.contains('is-hidden')){
        el.classList.add('is-hidden');
      }
    })

    
    list_item.forEach(el => {
      if(el.classList.contains('is-active')){
        el.classList.remove('is-active');
      }
    });

    let content_toShow;
    let active_tab;

    content_toShow = 'div-' + i;
    active_tab = 'li-' + i;


    document.getElementById(content_toShow).classList.remove('is-hidden');
    // document.getElementById(content_toShow).classList.replace('is-hidden', 'is-active');

    //ako nisu individualna takmicenja i ekipna takmicenja tabovi
    if(i != 1 && i != 2 && i != 0)
    {
      document.getElementById(active_tab).classList.add('is-active');
    }
  }

  createItem_Takmicar_Rezultat() : FormGroup
  {
    return this.fb.group({
      takmicar : "",
      rezultat : ""
    });
  };

  addItem_Takmicar_Rezultat()
  {
    this.takmicar_rez_Forms.push(this.createItem_Takmicar_Rezultat());
  }

  removeItem_Takmicar_Rezultat(i)
  {
    this.takmicar_rez_Forms.removeAt(i);
  }

  createItem() : FormGroup{
    return this.fb.group({
      tim1: "",
      tim2: ""
    })
  };

  addItem_kolo(br) : void {
    if(br == 1)
    {
      this.kolo_1Forms.push(this.createItem());
    }
    if(br == 2)
    {
      this.kolo_2Forms.push(this.createItem());
    }
    if(br == 3)
    {
      this.kolo_3Forms.push(this.createItem());
    }
    if(br == 4)
    {
      this.kolo_4Forms.push(this.createItem());
    }
    if(br == 5)
    {
      this.kolo_5Forms.push(this.createItem());
    }
    if(br == 6)
    {
      this.kolo_CetvfForms.push(this.createItem());
    }
    if(br == 7)
    {
      this.kolo_PolufForms.push(this.createItem());
    }
    if(br == 8)
    {
      this.kolo_FinForms.push(this.createItem());
    }
    if(br == 9)
    {
      this.kolo_TreceForms.push(this.createItem());
    }
  }

  createItem_tenis() : FormGroup {
    return this.fb.group({
      setovi_takm1: "",
      setovi_takm2 : ""
    });
  }

  addItem_tenis(i)
  {
    if(i == 0)
    {
      this.tenis_dinamik_Forms.push(this.createItem_tenis());
    }
    if(i == 1)
    {
      this.tenis_arr_osmina_Forms.push(this.createItem_tenis());
    }
    if(i == 2)
    {
      this.tenis_arr_cetvrtina_Forms.push(this.createItem_tenis());
    }
    if(i == 3)
    {
      this.tenis_arr_poluf_Forms.push(this.createItem_tenis());
    }
    if(i == 4)
    {
      this.tenis_arr_finale_Forms.push(this.createItem_tenis());
    }
    if(i == 5)
    {
      this.tenis_trecem_Forms.push(this.createItem_tenis());
    }
  }

  get tenis_trecem_Forms()
  {
    return this.form_individualniSport.get('trece_m') as FormArray;
  }

  get tenis_dinamik_Forms()
  {
    return this.form_individualniSport.get('dinamik') as FormArray;
  }
  get tenis_arr_osmina_Forms()
  {
    return this.form_individualniSport.get('tenis_arr_osmina') as FormArray;
  }
  get tenis_arr_cetvrtina_Forms()
  {
    return this.form_individualniSport.get('tenis_arr_cetvrtina') as FormArray;
  }
  get tenis_arr_poluf_Forms()
  {
    return this.form_individualniSport.get('tenis_arr_poluf') as FormArray;
  }
  get tenis_arr_finale_Forms()
  {
    return this.form_individualniSport.get('tenis_arr_finale') as FormArray;
  }

  get takmicar_rez_Forms()
  {
    return this.form_individualniSport.get('takmicar_rezultat') as FormArray;
  }

  get kolo_1Forms() 
  {
    return this.form_ekipniSport.get('kolo_1') as FormArray;
  }
  get kolo_2Forms() 
  {
    return this.form_ekipniSport.get('kolo_2') as FormArray;
  }
  get kolo_3Forms() 
  {
    return this.form_ekipniSport.get('kolo_3') as FormArray;
  }
  get kolo_4Forms() 
  {
    return this.form_ekipniSport.get('kolo_4') as FormArray;
  }
  get kolo_5Forms() 
  {
    return this.form_ekipniSport.get('kolo_5') as FormArray;
  }
  get kolo_CetvfForms() 
  {
    return this.form_ekipniSport.get('cetvrtinaf') as FormArray;
  }
  get kolo_PolufForms() 
  {
    return this.form_ekipniSport.get('poluf') as FormArray;
  }
  get kolo_FinForms() 
  {
    return this.form_ekipniSport.get('finale') as FormArray;
  }
  get kolo_TreceForms()
  {
    return this.form_ekipniSport.get('trece_mesto') as FormArray;
  }

  init_moja_takmicenja(){
    this.delegat_service.dohvatiTakmicenja_service(this.ulogovan.ime + ' ' + this.ulogovan.prezime).subscribe((takmicenja : TakmicenjeClass[]) => {
      this.moja_takmicenja = takmicenja;
      console.log(this.moja_takmicenja);

      this.content_indivdSportovi_unos_rasporeda.length = 0;

      this.delegat_service.dohvati_raspored_individ().subscribe((rasporedi : IndividRasporedClass[])=> {
        
        this.moja_takmicenja.forEach(t => {
          let found = false;
          rasporedi.forEach(r => {
            if(r.idTak == t.id)
            {
              found = true;
            }
          })
          if(!found && t.tip == 'individ')
          {
            this.content_indivdSportovi_unos_rasporeda.push({'id' : t.id, 'sport' : t.sport, 'disciplina' : t.disciplina, 'konk' : t.konkurencija});
          }

          if(t.tip == 'ekipni' && t.kraj == 0)
          {
            this.content_ekipniSportovi.push({'id' : t.id, 'sport' : t.sport, 'disciplina' : t.disciplina, 'konk' : t.konkurencija});
          }
        })
      })

    })
  };

  ngSubmit_unesi_raspored_individ()
  {
    let id = this.form_individualniSport.get('takmicenje').value;
    let datum = this.form_individualniSport.get('datum').value;
    let vreme = this.form_individualniSport.get('vreme').value;
    let lokacija = this.form_individualniSport.get('lokacija').value;

    this.delegat_service.unesi_raspored_individ(id, datum, vreme, lokacija).subscribe((odg) => {
      //
    });

    this.moja_takmicenja.forEach(t => {
      if(t.id == id && t.sport == 'tenis')
      {
        //formiraj utakmice za tenis - singl

        let svi_teniseri = t.ucesnici;
        svi_teniseri.sort((a,b) => {
          let a_nos = parseInt(a.split(' - ')[1]);
          let b_nos = parseInt(b.split(' - ')[1]);

          if(a_nos < b_nos) return -1;
          else if(a_nos > b_nos) return 1;
          else return 0;
        });

        let mecevi = [];
        let arr = svi_teniseri;
        let cnt = 0;
        let gr_faza = [];


        for(let x = 0; x < svi_teniseri.length/4; x++)
        {
          gr_faza.push((x+1));
          gr_faza.push((svi_teniseri.length/2 - x));
        }

        let index = 0;
        for(let i = 0; i < svi_teniseri.length;)
        {
                                                                                                  //grupna_faza_individ - '
          mecevi.push({'idTak' : id, 'takmicar1' : arr[i], 'takmicar2' : arr[i+2], 'grupna_faza' : t.grupa + ' - ' + gr_faza[index++]});
          //controlArr.push(this.createItem_tenis());

          i++;
          if(i-cnt == 2)
          {
            i += 2;
            cnt = i;
          }
        }

        console.log(mecevi);

        mecevi.forEach(mec => {
          this.delegat_service.unos_tenis_rasporeda(mec.idTak, mec.takmicar1, mec.takmicar2, mec.grupna_faza).subscribe((odg) => {});
        })
        
      }
    })
  }

  tenisRez_osmina : EkipniRezultatiClass[] = [];
  tenisRez_cetvrtina : EkipniRezultatiClass[] = [];
  tenisRez_poluf : EkipniRezultatiClass[] = [];
  tenisRez_finale : EkipniRezultatiClass[] = [];
  tenisRez_trecem : EkipniRezultatiClass[] = [];

  curr_tenis_controlArray = [];
  curr_tenis_formArray : FormArray;
  curr_tenis_rez;

  dovuci_teniske_meceve()
  {
    document.getElementById('div-tenis-individ').classList.remove('is-hidden');
    let idTak = this.form_individualniSport.get('takmicenje').value;

    this.delegat_service.dohvati_ekipne_rezultate_poIDTAK(idTak).subscribe((rez : EkipniRezultatiClass[]) => {
      this.svi_ekipni_rezultati = rez;

      this.svi_ekipni_rezultati.forEach((el) => {
        if(el.idTak == idTak)
        {
          if(el.grupna_faza.match(/(osmina finala)/))
          {
            if(el.br_p1 == -1)
            {
              this.addItem_tenis(1);
              this.tenisRez_osmina.push(el);
            }
          }
          if(el.grupna_faza.match(/(cetvrtina)/))
          {
            if(el.br_p1 == -1)
            {
              this.addItem_tenis(2);
              this.tenisRez_cetvrtina.push(el);
            }
          }
          if(el.grupna_faza.match(/(polu)/))
          {
            if(el.br_p1 == -1)
            {
              this.addItem_tenis(3);
              this.tenisRez_poluf.push(el);
            }
          }
          if(el.grupna_faza == 'trece mesto')
          {
            if(el.br_p1 == -1)
            {
              this.addItem_tenis(5);
              this.tenisRez_trecem.push(el);
            }
          }
          if(el.grupna_faza == 'finale')
          {
            if(el.br_p1 == -1)
            {
              this.addItem_tenis(4);
              this.tenisRez_finale.push(el);
            }
          }
        }
      })

      console.log(this.tenisRez_cetvrtina);
    })
    
  }

  isTenis = false;

  onChange_izaberi_individ_takmicenje()
  {
    let idTak = this.form_individualniSport.get('takmicenje').value;
    this.select_content_IndSp_unos_rez.forEach(c => {
      if(c.id == idTak)
      {
        this.individ_selected_sport = c.sport;
        this.individ_selected_disc = c.disciplina;
      }
    })



    this.delegat_service.dohvati_sve_rezultate_individ().subscribe((odg : RezultatClass[])=>{
      this.svi_individ_rezultati = odg;
      this.moja_takmicenja.forEach(t => {
        if(idTak == t.id)
        {
          this.takmicariArr = [];
          this.grupna_faza_individ = t.grupa;
          this.prikazi_dugme_kraj_naredna_faza();
  
          if(this.individ_selected_sport == 'tenis')
          {
            document.getElementById('div-4').classList.add('is-hidden');
  
            if(this.grupna_faza_individ == 'osmina finala')
            {
              this.curr_tenis_controlArray = this.form_individualniSport.get('tenis_arr_osmina').value;
              this.curr_tenis_formArray = this.tenis_arr_osmina_Forms;
              this.curr_tenis_rez = this.tenisRez_osmina;
            }
            if(this.grupna_faza_individ == 'cetvrtina finala')
            {
              this.curr_tenis_controlArray = this.form_individualniSport.get('tenis_arr_cetvrtina').value;
              this.curr_tenis_formArray = this.tenis_arr_cetvrtina_Forms;
              this.curr_tenis_rez = this.tenisRez_cetvrtina;
            }
            if(this.grupna_faza_individ == 'polufinale')
            {
              this.curr_tenis_controlArray = this.form_individualniSport.get('tenis_arr_poluf').value;
              this.curr_tenis_formArray = this.tenis_arr_poluf_Forms;
              this.curr_tenis_rez = this.tenisRez_poluf;
            }
            if(this.grupna_faza_individ == 'trece meesto')
            {
              this.curr_tenis_formArray = this.tenis_trecem_Forms;
              this.curr_tenis_rez = this.tenisRez_trecem;
            }
            if(this.grupna_faza_individ == 'finale')
            {
              this.curr_tenis_controlArray = this.form_individualniSport.get('tenis_arr_finale').value;
              this.curr_tenis_formArray = this.tenis_arr_finale_Forms;
              this.curr_tenis_rez = this.tenisRez_finale;
            }
            this.dovuci_teniske_meceve();
  
            this.isTenis = true;
  
  
            return;
          }
  
          /*
          *
          * Dohvatanje takmicara koji se takmice u trenutnom kolu.
          *
          */
          if(this.grupna_faza_individ == 'knockout')
          {
            this.takmicariArr = [];
            this.svi_individ_rezultati.forEach(rez => {
              if(rez.idTak == idTak && rez.grupa == 'knockout')
              {
                console.log('pushujem u takmicariArr');
                this.takmicariArr.push(rez.takmicar);
              }
            })
  
            console.log('jeste knockout, a takmicari su :');
            console.log(this.takmicariArr);
          }
          else if(this.grupna_faza_individ == 'kvalifikacije' || t.ucesnici.length <= 8)
          {
            this.takmicariArr = t.ucesnici;
          }
          else if(this.grupna_faza_individ == 'finale')
          {
            let rez = this.sortiraj_rezultate_ind(idTak, 'kvalifikacije');
            let count = (rez.length > 8 ? 8 : rez.length);
  
            for(let i = 0; i < count; i++)
            {
              this.takmicariArr.push(rez[i].takmicar);
            }
          }
  
  
          /*
          *
          * Izbacivanje takmicara iz liste ako je vec unet rezultat za njih.
          *
          */
          for(let i = 0; i < this.svi_individ_rezultati.length; i++)
          {
            if(this.svi_individ_rezultati[i].idTak != idTak)
              continue;
            
            for(let j = this.takmicariArr.length - 1; j >= 0; j--)
            {
              if(this.svi_individ_rezultati[i].takmicar == this.takmicariArr[j] && this.svi_individ_rezultati[i].grupa == this.grupna_faza_individ)
              {
                if(this.grupna_faza_individ == 'knockout' && this.svi_individ_rezultati[i].rezultat == '-')
                {
                  //ne izbacuj
                }
                else {
                  this.takmicariArr.splice(j, 1);
                }
              }
            }
          }
  
          console.log(this.takmicariArr);
          
          this.takmicar_rez_Forms.clear();
          for(let i = 0; i < this.takmicariArr.length; i++)
          {
            this.addItem_Takmicar_Rezultat();
          }
        }
      })
    })
  };

  tenis_onClick_unesi_setove(i)
  {
    let idTak = this.form_individualniSport.get('takmicenje').value;
    const setovi_takm1 = this.curr_tenis_formArray.at(i).get('setovi_takm1').value;
    const setovi_takm2 = this.curr_tenis_formArray.at(i).get('setovi_takm2').value;
    const takm1 = this.curr_tenis_rez[i].tim1;
    const takm2 = this.curr_tenis_rez[i].tim2;

    console.log(setovi_takm1, setovi_takm2, takm1, takm2, this.grupna_faza_individ);

    let gr_faza = this.grupna_faza_individ;
    if(this.grupna_faza_individ.match(/(osmina)|(cetvrtina)|(polu)/))
    {
      gr_faza = this.grupna_faza_individ.split(' - ')[0];
    }

    /*
    *
    * Unos rezultata za tenis.
    * 
    */
    this.delegat_service.unos_tenis_rezultata(idTak, takm1, takm2, setovi_takm1, setovi_takm2, gr_faza).subscribe((odg) => {
      console.log(odg['message']);

      this.curr_tenis_formArray.removeAt(i);
      this.curr_tenis_rez.splice(i, 1);

      /*
      *
      * Prelazak u narednu fazu.
      * 
      */
      if(this.curr_tenis_formArray.length == 0)
      {
        //prelazak u narednu rundu. -- ok
        //formiraj utakmice -- ok
        //promeni grupna_faza_individ -- ok
        //promeni u takmicenju to polje u  bazi -- ok
        // updateuj tenisRez_kolo da se vidi odmah i dodaj controlArray
        this.delegat_service.dohvati_ekipne_rezultate_poIDTAK(idTak).subscribe((rezultati : EkipniRezultatiClass[]) => {

          if(this.grupna_faza_individ == 'osmina finala')
          {
            let cetf1 = {'takmicar1' : '', 'takmicar2' : ''};
            let cetf2 = {'takmicar1' : '', 'takmicar2' : ''};
            let cetf3 = {'takmicar1' : '', 'takmicar2' : ''};
            let cetf4 = {'takmicar1' : '', 'takmicar2' : ''};
            rezultati.forEach(rez => {
              if(rez.grupna_faza.match(/(osmina finala - 1)/))
              {
                cetf1['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 2)/))
              {
                cetf1['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 3)/))
              {
                cetf2['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 4)/))
              {
                cetf2['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 5)/))
              {
                cetf3['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 6)/))
              {
                cetf3['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 7)/))
              {
                cetf4['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(osmina finala - 8)/))
              {
                cetf4['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }

            })
            this.grupna_faza_individ = 'cetvrtina finala';
            this.delegat_service.unos_tenis_rasporeda(idTak, cetf1['takmicar1'], cetf1['takmicar2'], 'cetvrtina finala - 1').subscribe((odg) => {console.log(odg['message'])});
            this.delegat_service.unos_tenis_rasporeda(idTak, cetf2['takmicar1'], cetf2['takmicar2'], 'cetvrtina finala - 2').subscribe((odg) => {console.log(odg['message'])});
            this.delegat_service.unos_tenis_rasporeda(idTak, cetf3['takmicar1'], cetf3['takmicar2'], 'cetvrtina finala - 3').subscribe((odg) => {console.log(odg['message'])});
            this.delegat_service.unos_tenis_rasporeda(idTak, cetf4['takmicar1'], cetf4['takmicar2'], 'cetvrtina finala - 4').subscribe((odg) => {console.log(odg['message'])});
            let ek1 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, cetf1['takmicar1'], cetf1['takmicar2'], 'cetvrtina finala - 1');
            let ek2 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, cetf2['takmicar1'], cetf2['takmicar2'], 'cetvrtina finala - 2');
            let ek3 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, cetf3['takmicar1'], cetf3['takmicar2'], 'cetvrtina finala - 3');
            let ek4 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, cetf4['takmicar1'], cetf4['takmicar2'], 'cetvrtina finala - 4');
            this.tenisRez_cetvrtina.push(ek1, ek2, ek3, ek4);
            this.addItem_tenis(2);
            this.addItem_tenis(2);
            this.addItem_tenis(2);
            this.addItem_tenis(2);
            this.curr_tenis_rez = this.tenisRez_cetvrtina;
            this.curr_tenis_formArray = this.tenis_arr_cetvrtina_Forms;
          }
          else if(this.grupna_faza_individ == 'cetvrtina finala')
          {
            let poluf1 = {'takmicar1' : '', 'takmicar2' : ''};
            let poluf2 = {'takmicar1' : '', 'takmicar2' : ''};

            rezultati.forEach(rez => {
              if(rez.grupna_faza.match(/(cetvrtina finala - 1)/))
              {
                poluf1['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(cetvrtina finala - 2)/))
              {
                poluf1['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(cetvrtina finala - 3)/))
              {
                poluf2['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(cetvrtina finala - 4)/))
              {
                poluf2['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
            });

            this.grupna_faza_individ = 'polufinale';
            this.delegat_service.unos_tenis_rasporeda(idTak, poluf1['takmicar1'], poluf1['takmicar2'], 'polufinale - 1').subscribe((odg) => {console.log(odg['message'])});
            this.delegat_service.unos_tenis_rasporeda(idTak, poluf2['takmicar1'], poluf2['takmicar2'], 'polufinale - 2').subscribe((odg) => {console.log(odg['message'])});
            let ek1 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, poluf1['takmicar1'], poluf1['takmicar2'], 'polufinale - 1');
            let ek2 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, poluf2['takmicar1'], poluf2['takmicar2'], 'polufinale - 2');
            this.tenisRez_poluf.push(ek1);
            this.tenisRez_poluf.push(ek2);
            this.addItem_tenis(3);
            this.addItem_tenis(3);
            this.curr_tenis_rez = this.tenisRez_poluf;
            this.curr_tenis_formArray = this.tenis_arr_poluf_Forms;
          }
          else if(this.grupna_faza_individ == 'polufinale')
          {
            let trece_m = {'takmicar1' : '', 'takmicar2' : ''};
            rezultati.forEach(rez => {
              if(rez.grupna_faza.match(/(polufinale - 1)/))
              {
                trece_m['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim2 : rez.tim1);
              }
              if(rez.grupna_faza.match(/(polufinale - 2)/))
              {
                trece_m['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim2 : rez.tim1);
              }
            });

            this.grupna_faza_individ = 'trece mesto';
            this.delegat_service.unos_tenis_rasporeda(idTak, trece_m['takmicar1'], trece_m['takmicar2'], 'trece mesto').subscribe((odg) => {console.log(odg['message'])});
            let ek1 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, trece_m['takmicar1'], trece_m['takmicar2'], 'trece mesto');
            this.tenisRez_trecem.push(ek1);
            this.addItem_tenis(5);
            this.curr_tenis_rez = this.tenisRez_trecem;
            this.curr_tenis_formArray = this.tenis_trecem_Forms;
          }
          else if(this.grupna_faza_individ == 'trece mesto') {

            let fin = {'takmicar1' : '', 'takmicar2' : ''};
            rezultati.forEach(rez => {
              if(rez.grupna_faza.match(/(polufinale - 1)/))
              {
                fin['takmicar1'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
              if(rez.grupna_faza.match(/(polufinale - 2)/))
              {
                fin['takmicar2'] = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
            })

            this.grupna_faza_individ = 'finale';
            this.delegat_service.unos_tenis_rasporeda(idTak, fin['takmicar1'], fin['takmicar2'], 'finale').subscribe((odg) => {console.log(odg['message'])});
            let ek1 = new EkipniRezultatiClass(idTak, this.individ_selected_sport, this.individ_selected_disc, fin['takmicar1'], fin['takmicar2'], 'finale');
            this.tenisRez_finale.push(ek1);
            this.addItem_tenis(4);

            this.curr_tenis_rez = this.tenisRez_finale;
            this.curr_tenis_formArray = this.tenis_arr_finale_Forms;
          }
          else if(this.grupna_faza_individ == 'finale')
          {
            this.delegat_service.oznaci_kraj_individ(idTak).subscribe((odg) => {console.log(odg['message'])});
            //unesi medalje
            let zlato_takm;
            let srebro_takm;
            let bronza_takm;
            let drz_zlato : string;
            let drz_srebro : string;
            let drz_bronza : string;

            rezultati.forEach(rez => {
              if(rez.grupna_faza == 'finale')
              {
                zlato_takm = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
                srebro_takm = (rez.br_p1 > rez.br_p2 ? rez.tim2 : rez.tim1);
              }
              if(rez.grupna_faza == 'trece mesto')
              {
                bronza_takm = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
              }
            });
            drz_zlato = this.fn_dohvati_drzavu({'ime' : zlato_takm.split(' - ')[0].split(' ')[0], 'prezime' : zlato_takm.split(' - ')[0].split(' ')[1]});
            drz_srebro = this.fn_dohvati_drzavu({'ime' : srebro_takm.split(' - ')[0].split(' ')[0], 'prezime' : srebro_takm.split(' - ')[0].split(' ')[1]});
            drz_bronza = this.fn_dohvati_drzavu({'ime' : bronza_takm.split(' - ')[0].split(' ')[0], 'prezime' : bronza_takm.split(' - ')[0].split(' ')[1]});
            let sport_disc = this.individ_selected_sport + ' | ' + this.individ_selected_disc;

            console.log(zlato_takm, srebro_takm, bronza_takm, drz_zlato, drz_srebro, drz_bronza);

            this.delegat_service.unesi_medalju_individ(drz_zlato, drz_srebro, drz_bronza, zlato_takm, srebro_takm, bronza_takm, sport_disc).subscribe((odg) => {console.log(odg)});
            this.delegat_service.set_ima_medalju_tenis(zlato_takm.split(' - ')[0],srebro_takm.split(' - ')[0], bronza_takm.split(' - ')[0]).subscribe((odg) => {});
          }

          console.log(this.grupna_faza_individ + ' <- menjam u nju');
          this.delegat_service.promeni_grupu_takmicenju_individ(idTak, this.grupna_faza_individ).subscribe((odg) => { console.log(odg)});
        })

        
      }
    })
  }

  fn_dohvati_drzavu(takmicar) : string
  {
    let ret;
    this.svi_takmicari.forEach(takm => {
      if(takm.ime == takmicar['ime'] && takm.prezime == takmicar['prezime'])
      { 
        ret = takm.drzava;
      }
    })

    return ret;
  }

  onClick_unesi_rezultat_individ(i)
  {
    let takmicar = this.takmicariArr[i];
    let idTak = this.form_individualniSport.get('takmicenje').value;
    let rez = this.takmicar_rez_Forms.at(i).get('rezultat').value;
   

    if(this.grupna_faza_individ == 'knockout')
    {
      //set rezultat
      this.delegat_service.set_rezultat_individ(takmicar, idTak, 'knockout', rez).subscribe((odg) => {console.log(odg)});
      this.takmicariArr.splice(i, 1);
      this.removeItem_Takmicar_Rezultat(i);
    }
    else 
    {
      this.delegat_service.unesi_rezultat_individ(takmicar, idTak, this.grupna_faza_individ, rez, '-').subscribe((odg) => {
  
        this.takmicariArr.splice(i, 1);
        this.removeItem_Takmicar_Rezultat(i);
    
        //Ako je poslednji, unesi rang. - nzm za sta mi treba
        if(this.takmicariArr.length == 0)
        {
          this.delegat_service.dohvati_sve_rezultate_individ().subscribe((odg : RezultatClass[]) => {
            this.svi_individ_rezultati = odg;
            let rezultati = this.sortiraj_rezultate_ind(idTak, this.grupna_faza_individ);
  
            rezultati.forEach((r,i) => {
              this.delegat_service.promeni_rang_individ(r.id, i+1).subscribe((odg) => {
              });
            })
          });
        }
  
      });
    }


  }

  sortiraj_rezultate_ind(idTak, grupna_faza) : RezultatClass[]
  {
    let rezultati : RezultatClass[] = [];

    this.svi_individ_rezultati.forEach(r =>{
      if(r.idTak == idTak && r.grupa == grupna_faza)
      {
        rezultati.push(r);
      }
    });

    let sport : string = this.individ_selected_sport;
    let disc : string = this.individ_selected_disc;

    
    rezultati.sort((rez1, rez2) => {
      let r1 = rez1.rezultat;
      let r2 = rez2.rezultat;
      let sort = 'asc';

      if(sport == 'streljastvo')
      {
        sort = 'desc';
      }

      if(sport == 'atletika' || sport == 'plivanje')
      {
        let rxp_ss_tt = /(100 metara trcanje)|(200 metara trcanje)|(400 metara trcanje)|(100m leptir)|(200m slobodno)/;
        let rxp_mm_ss_tt = /(800 metara trcanje)|(10000 metara trcanje)|(5000 metara trcanje)/;
        let rxp_m_cm = /(skok)|(bacanje)/; // mm_cm
        let rxp_cc_mm_ss = /(maraton)|(hodanje)/;
  
        if(disc.match(rxp_ss_tt))
        {
          let t1 = rez1.rezultat.split(',');
          let t2 = rez2.rezultat.split(',');
          r1 = t1[0] + '.' + t1[1];
          r2 = t2[0] + '.' + t2[1];
        }
        if(disc.match(rxp_mm_ss_tt))
        {
          let t1 = rez1.rezultat.split(':');
          let t1_ss_tt = rez1.rezultat.split(',');
          let t2 = rez2.rezultat.split(',');
          let t2_ss_tt = rez2.rezultat.split(',');

          let num1 : number
  
          r1 = (parseInt(t1[0])*60 + t1_ss_tt[0]) + '.' + t1_ss_tt[1];
          r2 = (parseInt(t2[0])*60 + t2_ss_tt[0]) + '.' + t2_ss_tt[1];
        }
        if(disc.match(rxp_m_cm))
        {
          let t1 = rez1.rezultat.split(',');
          let t2 = rez2.rezultat.split(',');
          r1 = t1[0] + '.' + t1[1];
          r2 = t2[0] + '.' + t2[1];
          sort = 'desc';
        }
        if(disc.match(rxp_cc_mm_ss))
        {
          let t1 = rez1.rezultat.split(':');
          let t2 = rez2.rezultat.split(':');
          r1 = (parseInt(t1[0])*3600 + parseInt(t1[1])*60) + '' + t1[2];
          r2 = (parseInt(t2[0])*3600 + parseInt(t2[1])*60) + '' + t2[2];
        }
  
      }
  
      if(sort == 'asc')
      {
        if(parseFloat(r1) > parseFloat(r2))
        {
          return 1;
        }
        else if(parseFloat(r1) < parseFloat(r2))
        {
          return -1;
        }
        else
        {
          return 0;
        }
      }
      else if(sort == 'desc')
      {
        if(parseFloat(r1) < parseFloat(r2))
        {
          return 1;
        }
        else if(parseFloat(r1) > parseFloat(r2))
        {
          return -1;
        }
        else
        {
          return 0;
        }
      }
    });

    console.log(rezultati);
    return rezultati;
  }

  onClick_naredna_faza_individ()
  {
    let idTak = this.form_individualniSport.get('takmicenje').value;
    let naredna_faza;
    if(this.grupna_faza_individ == 'kvalifikacije')
    {
      naredna_faza = 'finale';
      this.grupna_faza_individ = 'finale';
    }
    if(this.grupna_faza_individ.match(/(. serija)/))
    {
      let br_serije = parseInt(this.grupna_faza_individ.match(/\d/)[0]);

      naredna_faza = ++br_serije + '. serija';
      this.grupna_faza_individ = naredna_faza;
    }
    
    this.prikazi_dugme_kraj_naredna_faza();

    //Promeni grupu takmicenju, i dohvati opet moja takmicenja, kako bi imao updejtovanu grupu, pa opet dohvati takmicare.
    this.delegat_service.promeni_grupu_takmicenju_individ(idTak, naredna_faza).subscribe((odg) => {
      console.log(odg['message']);

      this.delegat_service.dohvatiTakmicenja_service(this.ulogovan.ime + ' ' + this.ulogovan.prezime).subscribe((odg : TakmicenjeClass[]) => {
        this.moja_takmicenja = odg;
        this.onChange_izaberi_individ_takmicenje();
      })

    });
  }

  sortiraj_knockout(idTak)
  {
    let sorted_knockout = this.sortiraj_rezultate_ind(idTak, 'knockout');
    let rang1 = false;
    sorted_knockout.forEach((rezultat_obj, index) => {
      if(rezultat_obj.rang.includes('-'))
      {
        if(rang1 == false)
        {
          rang1 = true;
          sorted_knockout[index].rang = rezultat_obj.rang.split('-')[0];
        }
        else
        {
          sorted_knockout[index].rang = rezultat_obj.rang.split('-')[1];
        }
      }
    });

    return sorted_knockout;
  }

  onClick_kraj_takmicenja_individ()
  {
    let idTak = this.form_individualniSport.get('takmicenje').value;
    
    this.delegat_service.dohvati_sve_rezultate_individ().subscribe((odg : RezultatClass[]) => {
      this.svi_individ_rezultati = odg;

      let prva_tri = [];

      if(this.individ_selected_sport == 'streljastvo')
      {
        let takmicari_rezultat = [];
        for(let i = 0; i < 6; i++)
        {
          //Nije mi potrebno sortirano, ali mi lakse bilo da mi vrati rezultate iz ove serije nego da idem kroz sve pa da pitam da li je idTak = id i serija ta i ta..
          let sortedArr = this.sortiraj_rezultate_ind(idTak, (i + 1) + '. serija');
          
          //Prvi put pushuj takmicara i rezultat, a ostali put samo inkrementiraj rezultate.
          sortedArr.forEach(r => 
          {
            if(i == 0)
            {
              takmicari_rezultat.push({'takmicar' : r.takmicar, 'rezultat' : r.rezultat});
            }
            else 
            {
              takmicari_rezultat.forEach(tr => {
                if(r.takmicar == tr.takmicar)
                {
                  tr.rezultat = parseInt(tr.rezultat) + parseInt(r.rezultat);
                }
              })
            }
          });
        }

        takmicari_rezultat.sort((a, b) => 
        {
          if(parseInt(a.rezultat) > parseInt(b.rezultat)) return -1;
          else if(parseInt(a.rezultat) < parseInt(b.rezultat)) return 1;
          else return 0;
        });

        prva_tri = takmicari_rezultat;
      }
      else if(this.individ_selected_disc.match(/(skok)|(bacanje)/))
      {
        if(this.grupna_faza_individ == 'knockout')
        {
          let sorted_knockout = this.sortiraj_knockout(idTak);
          prva_tri = sorted_knockout;

          prva_tri.sort((a,b) => {
            if(parseInt(a.rang) > parseInt(b.rang)) return 1;
            else return -1;
          })
        }
        else
        {
          let takmicari_rezultat = [];
          //za svakog takmicara nadji najbolji rezultat, pushuj u globalni niz i taj niz sortiraj.
          for(let i = 0; i < 3; i++)
          {
            let rez_serija_i = this.sortiraj_rezultate_ind(idTak, (i + 1) + '. serija');

            rez_serija_i.forEach(r => {
                if(i == 0)
                {
                  takmicari_rezultat.push({'takmicar' : r.takmicar, 'rezultat' : r.rezultat});
                }
                else 
                {
                  takmicari_rezultat.forEach((tr,i) => {
                    if(r.takmicar == tr.takmicar)
                    {
                      let rez1 = tr.rezultat.split(',')[0] + '.' + tr.rezultat.split(',')[1];
                      let rez2 = r.rezultat.split(',')[0] + '.' + r.rezultat.split(',')[1];
                      
                      if(parseFloat(rez1) < parseFloat(rez2))
                      {
                        takmicari_rezultat[i].rezultat = r.rezultat;
                      }
                    }
                  })
                }
            });
          }

          takmicari_rezultat.sort((a, b) => 
          {
            let reza = a.rezultat.split(',')[0] + '.' + a.rezultat.split(',')[1];
            let rezb = b.rezultat.split(',')[0] + '.' + b.rezultat.split(',')[1];

            if(parseFloat(reza) > parseFloat(rezb)) return -1;
            else if(parseFloat(reza) < parseFloat(rezb)) return 1;
            else return 0;
          })

          prva_tri = takmicari_rezultat;
        }
      }
      //Ako je vec knockout faza, to znaci da se zavrsava sada.
      else if(this.grupna_faza_individ == 'knockout')
      {
        let sorted_knockout = this.sortiraj_knockout(idTak);
        prva_tri = sorted_knockout;

        prva_tri.sort((a,b) => {
          if(parseInt(a.rang) > parseInt(b.rang)) return 1;
          else return -1;
        })
      }
      else
      {
        prva_tri = this.sortiraj_rezultate_ind(idTak, this.grupna_faza_individ)
      }

      console.log('Prva tri takmicara : ');
      console.log(prva_tri);

      //Ako je vec knockout => znaci sada unosim medalje.


      let udji_u_knockout = false;

      //Provera da li se ulazi u knockout fazu.
      if(this.grupna_faza_individ != 'knockout')
      {
        let counter = (prva_tri.length > 3 ? 4 : prva_tri.length);
        let ind1;
        let ind2;
        for(let i = 0; i < counter-1; i++)
        {
          if(prva_tri[i].rezultat == prva_tri[i+1].rezultat)
          {
            udji_u_knockout = true;
            ind1 = i;
            ind2 = i + 1;
          }
  
          //Knockout faza. 
        }
        if(udji_u_knockout)
        {
          this.grupna_faza_individ = 'knockout';
          this.delegat_service.knockout_unesi_rez(prva_tri, idTak, ind1, ind2).subscribe((odg) => {
            console.log('hahaha');
            this.delegat_service.promeni_grupu_takmicenju_individ(idTak, 'knockout').subscribe(odg => {
              this.delegat_service.dohvatiTakmicenja_service(this.ulogovan.ime + ' ' + this.ulogovan.prezime).subscribe((odg : TakmicenjeClass[]) => {
                this.moja_takmicenja = odg;
                this.onChange_izaberi_individ_takmicenje();
                this.prikazi_dugme_kraj_naredna_faza();
              })
            }) 
          })
        }
      }

      if(udji_u_knockout == false)
      {
        let mesta = [];
        for(let x = 0; x < 3; x++)
        {
          let ime = prva_tri[x].takmicar.split(' ')[0];
          let prezime = prva_tri[x].takmicar.split(' ')[1];

          for(let i = 0; i < this.svi_takmicari.length; i++)
          {
            if(this.svi_takmicari[i].ime == ime && this.svi_takmicari[i].prezime == prezime)
            {
              mesta.push(this.svi_takmicari[i].drzava);
            }
          }
        }
        console.log("Drzave mesta");
        console.log(mesta);
        

        // this.moja_takmicenja.forEach((tak) => )
        let sport_disc = this.individ_selected_sport + ' | ' + this.individ_selected_disc;
        console.log(sport_disc);
        
  
        this.delegat_service.unesi_medalju_individ(mesta[0], mesta[1], mesta[2], prva_tri[0].takmicar, prva_tri[1].takmicar, prva_tri[2].takmicar, sport_disc).subscribe((odg) => {});
        this.delegat_service.oznaci_kraj_individ(idTak).subscribe((odg) => {});
      }

    })
  }




  prikazi_dugme_kraj_naredna_faza()
  {
    let x = 1;
    if(this.individ_selected_sport == 'streljastvo')
    {
      if(this.grupna_faza_individ == '6. serija')
      {
        x = 2;
      }
      if(this.grupna_faza_individ == 'knockout')
      {
        x = 2;
      }
    }
    else if(this.individ_selected_disc.match(/(skok)|(bacanje)/))
    {
      if(this.grupna_faza_individ == '3. serija')
      {
        x = 2;
      }
      if(this.grupna_faza_individ == 'knockout')
      {
        x = 2;
      }
    }
    else 
    {
      if(this.grupna_faza_individ == 'finale' || this.grupna_faza_individ == 'knockout')
      {
        x = 2;
      }
    }

    if(x == 1)
    {
      document.getElementById('button-naredna-faza').classList.remove('is-hidden');
      document.getElementById('button-kraj-takmicenja').classList.add('is-hidden');
    }
    if(x == 2)
    {
      document.getElementById('button-kraj-takmicenja').classList.remove('is-hidden');
      document.getElementById('button-naredna-faza').classList.add('is-hidden');
    }
  }
  resetForm()
  {
    this.form_listaTakmicara.reset();

    this.form_listaTakmicara = this.fb.group({
      takmicar : 'Izaberite takmičara',
      rezultat : "",
     
    });
  }
  compareFn(opt1, opt2) : boolean 
  {
    return opt1 === opt2;
  }

  // EKIPNI SPORT ---------------------------
  /*
  ***************************************************************
  */


  onChange_izbor_sporta() : void 
  {
    let izabrani_ekipni_sport = this.form_ekipniSport.get('sport').value;

    this.moja_takmicenja.forEach(t => {
      if(t.sport == izabrani_ekipni_sport)
      {
        this.discipline_arr_ekipni.push(t.disciplina);
      }
    });
  };

  gr_faza_ekipni;
  selected_ekipni_sport;
  selected_ekipna_disc;

  onChange_izbor_takmicenja_ekipni() : void 
  {
    let idTak = this.form_ekipniSport.get('takmicenje').value;

    this.moja_takmicenja.forEach(t => {
      if(t.id == idTak)
      {
        this.selected_ekipni_sport = t.sport;
        this.selected_ekipna_disc = t.disciplina;
      }
    }) 

    this.curr_takmicenje_index = this.getIndex_takmicenja(idTak);

    let postoji_raspored;

    this.delegat_service.dohvatiTakmicenja_service(this.ulogovan.ime + ' ' + this.ulogovan.prezime).subscribe((odg : TakmicenjeClass[]) => {
      this.moja_takmicenja = odg;

      this.moja_takmicenja.forEach(takm => {
        if(takm.id == idTak)
        {
          this.gr_faza_ekipni = takm.grupa;
          postoji_raspored = takm.postoji_raspored

          let to_split = this.gr_faza_ekipni;
          console.log(to_split);

          if(to_split == "9. kolo")
          {
            this.kraj_ekipnog_takmicenja = false; //omoguci dugme
          }
          if(to_split == "cetvrtina finala")
          {
            this.curr_kolo = 6;
          }
          else if(to_split === "polufinale" )
          {
            this.curr_kolo = 7;
          }
          else if(to_split === "finale")
          {
            this.curr_kolo = 8;
          }
          else {
            this.curr_kolo = parseInt(to_split.split('.')[0])
          }

          console.log(this.curr_kolo);
          if(postoji_raspored == "ne")
          {
            document.getElementById('button-unesite-raspored').classList.remove('is-hidden');
          }

          if(postoji_raspored == "da")
          {
            //proveri da li je satnica uneta
            //unesi satnicu

            this.dovuciUtakmice();
          }

        }
      })

    })
  }

  formiraj_zdreb(ekipe_A, ekipe_B)
  {
    let idTak = this.form_ekipniSport.get('takmicenje').value;
    this.delegat_service.formiraj_zdreb(idTak, ekipe_A, ekipe_B).subscribe((odg) => {
      console.log(odg);
    })
  }

  onClick_unesite_raspored_ekipni()
  {
    const ucesnici = this.moja_takmicenja[this.curr_takmicenje_index].ucesnici.slice();
    let idTak = this.form_ekipniSport.get('takmicenje').value;
    console.log(this.selected_ekipni_sport);
    console.log(ucesnici);
    console.log(idTak);

    if(ucesnici.length == 12)
    {
      if(this.selected_ekipni_sport == 'kosarka' || this.selected_ekipni_sport=='odbojka' || this.selected_ekipni_sport=='vaterpolo')
      {
        const ekipe_A = ucesnici.slice(0, 6);
        const ekipe_B = ucesnici.slice(6);
        console.log(ekipe_A);
  
        const raspored_A = this.rr_alg(ekipe_A);
        const raspored_B = this.rr_alg(ekipe_B);
  
        this.formiraj_zdreb(ekipe_A, ekipe_B);
  
        console.log(raspored_A);
  
        this.delegat_service.unos_rasporeda_kola(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, raspored_A).subscribe((odg)=> {
          // alert(odg['message']);
          this.delegat_service.unos_rasporeda_kola(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, raspored_B).subscribe((odg)=> {
            // alert(odg['message']);

            this.dovuciUtakmice();
          });
        });
        
        

        this.delegat_service.init_eliminacione_utakmice(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc).subscribe((odg) => {
          //
        })

      }
    }
  };

  currkolo_ekipniRez : EkipniRezultatiClass[];

  onClick_unos_poena(i)
  {


    let kolo_nForms : FormArray;
    let grupna_faza;
    
    console.log('Prosledjeno i: ' + i);
    console.log('Curr kolo ' + this.curr_kolo);
    
    if(this.curr_kolo == 1)
    {
      this.currkolo_ekipniRez = this.ekipniRez_kolo1;
      kolo_nForms = this.kolo_1Forms;
      grupna_faza = '1. kolo';
    }
    if(this.curr_kolo == 2)
    {
      this.currkolo_ekipniRez = this.ekipniRez_kolo2;
      kolo_nForms = this.kolo_2Forms;
      grupna_faza = '2. kolo';
    }
    if(this.curr_kolo == 3)
    {
      this.currkolo_ekipniRez = this.ekipniRez_kolo3;
      kolo_nForms = this.kolo_3Forms;
      grupna_faza = '3. kolo';
    }
    if(this.curr_kolo == 4)
    {
      this.currkolo_ekipniRez = this.ekipniRez_kolo4;
      kolo_nForms = this.kolo_4Forms;
      grupna_faza = '4. kolo';
    }
    if(this.curr_kolo == 5)
    {
      this.currkolo_ekipniRez = this.ekipniRez_kolo5;
      kolo_nForms = this.kolo_5Forms;
      grupna_faza = '5. kolo';
    }
    if(this.curr_kolo == 6)
    {
      this.currkolo_ekipniRez = this.ekipniRez_cetvrtina;
      kolo_nForms = this.kolo_CetvfForms;
      grupna_faza = 'cetvrtina finala';
    }
    if(this.curr_kolo == 7)
    {
      this.currkolo_ekipniRez = this.ekipniRez_poluf;
      kolo_nForms = this.kolo_PolufForms;
      grupna_faza = 'polufinale';
    }
    if(this.curr_kolo == 8)
    {
      this.currkolo_ekipniRez = this.ekipniRez_finale;
      kolo_nForms = this.kolo_FinForms;
      grupna_faza = 'finale';
    }
    
    const br_p1 : number = parseInt(kolo_nForms.at(i).get('tim1').value);
    const br_p2 : number = parseInt(kolo_nForms.at(i).get('tim2').value);
    const tim1 = this.currkolo_ekipniRez[i].tim1;
    const tim2 = this.currkolo_ekipniRez[i].tim2;
    console.log(tim1 + " " + br_p1);
    console.log(tim2 + " " + br_p2);

    //postavljanje lokalnom nizu poene
    this.currkolo_ekipniRez[i].br_p1 = br_p1;
    this.currkolo_ekipniRez[i].br_p2 = br_p2;
    let idTak = this.form_ekipniSport.get('takmicenje').value;

    if(this.curr_kolo < 6)
    {
      if(br_p1 > br_p2)
      {
        console.log('tim1 ' + tim1 + ' br_p1 ' + br_p1);
        console.log('tim2 ' + tim2 + ' br_p2 ' + br_p2);
        this.delegat_service.update_zdreb(idTak, tim1, tim2 , br_p1, br_p2).subscribe((odg) => { 
          console.log(odg['message'])


        });
      }
      else {
        console.log('tim2' + tim2);
        console.log('tim1' + tim1);
        this.delegat_service.update_zdreb(idTak, tim2, tim1, br_p2, br_p1).subscribe((odg) => { 
          console.log(odg['message']) 
        
        });
      }
    }

    this.currkolo_ekipniRez.splice(i, 1);
    kolo_nForms.removeAt(i);

    this.delegat_service.unos_poena(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, tim1, tim2, br_p1, br_p2, grupna_faza).subscribe((odg) => {
      // alert(odg['message']);


    })
  }

  onClick_unesi_satnicu_ekipni()
  {
    let idTak = this.form_ekipniSport.get('takmicenje').value;
    let selected_utakmica = this.form_ekipniSport.get('utakmica').value;
    let lokacija = this.form_ekipniSport.get('lokacija').value;
    let datum = this.form_ekipniSport.get('datum').value;
    let vreme = this.form_ekipniSport.get('vreme').value;


    //Ovo izbacivanje tek nakon sto se proveri lokacija i pocetak.
    const index = this.ekipne_utakmice.indexOf(selected_utakmica);
    this.ekipne_utakmice.splice(index, 1);
    let tim1;
    let tim2;
    

    if(selected_utakmica.match(/(cetvrtina finala)|(polufinale)|(finale)/))
    {
      tim1 = '-';
      tim2 = '-';
    }
    else {
      tim1 = selected_utakmica.split(' - ')[0];
      tim2 = (selected_utakmica.split(' - ')[1].split(' | ')[0]);
    }

    let grupa = selected_utakmica.split(' | ')[1];
  
    for(let i = 0; i < this.svi_ekipni_rezultati.length; i++)
    {
      const temp = this.svi_ekipni_rezultati[i];
      if(temp.idTak == idTak && temp.tim1 == tim1 && temp.tim2 == tim2 && temp.grupna_faza == grupa)
      {
        this.svi_ekipni_rezultati[i].lokacija = lokacija;
        this.svi_ekipni_rezultati[i].datum = datum;
        this.svi_ekipni_rezultati[i].vreme = vreme;
      }
    }

    this.delegat_service.unos_satnice(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, tim1, tim2, lokacija, datum, vreme, grupa).subscribe((odg) => {
      console.log(odg['message']);
    })
  }

  getIndex_takmicenja(idTak)
  {
    let ret = -1;
    this.moja_takmicenja.forEach((t,index) => {
      if(t.id == idTak)
      {
        ret = index;
      }
    });

    return ret;
  }
  
  

  rr_alg(ekipa : string[])
  {
    const kolo_cnt = ekipa.length - 1;
    const pola = ekipa.length/2;

    const svi_upareni = [];
    let team_index = ekipa.map((_, i) => i).slice(1);

    for(let kolo = 0; kolo < kolo_cnt; kolo++)
    {
      const upareno_kolo = [];

      const novi_indexi = [0].concat(team_index);
      const prva_pol = novi_indexi.slice(0, pola);
      const druga_pol = novi_indexi.slice(pola).reverse();


      for(let i = 0; i < prva_pol.length; i++)
      {
        upareno_kolo.push({
          tim1 : ekipa[prva_pol[i]],
          tim2 : ekipa[druga_pol[i]]
        });
      }

      team_index.push(team_index.shift());

      svi_upareni.push(upareno_kolo);
    }


    return svi_upareni;
  }

  svi_ekipni_rezultati : EkipniRezultatiClass[];
  ekipne_utakmice : Array<string> = [];
  ekipniRez_kolo1 : EkipniRezultatiClass[] = [];
  ekipniRez_kolo2 : EkipniRezultatiClass[] = [];
  ekipniRez_kolo3 : EkipniRezultatiClass[] = [];
  ekipniRez_kolo4 : EkipniRezultatiClass[] = [];
  ekipniRez_kolo5 : EkipniRezultatiClass[] = [];
  ekipniRez_cetvrtina : EkipniRezultatiClass[] = [];
  ekipniRez_poluf : EkipniRezultatiClass[] = [];
  ekipniRez_finale : EkipniRezultatiClass[] = [];
  ekipniRez_trecem : EkipniRezultatiClass[] = [];

  zdrebovi : ZdrebClass[];
  
  onClick_oznaci_kraj_kola()
  {
    let idTak = this.form_ekipniSport.get('takmicenje').value;
    let grupa;

    console.log(this.curr_kolo);
    if(this.curr_kolo < 9)  // da ne bi islo preko 9
    {
      this.curr_kolo += 1;
    }

    
    if(this.curr_kolo == 6)
    {
      grupa = 'cetvrtina finala';
    }
    else if(this.curr_kolo == 7)
    {
      grupa = 'polufinale';
    }
    else if(this.curr_kolo == 8)
    {
      grupa = "finale";
    }
    else if(this.curr_kolo == 9)
    {
      this.kraj_ekipnog_takmicenja = false; //omoguci dugme.
      grupa = 'kraj';
    }
    else {
      grupa = this.curr_kolo + '. kolo';
    }

    this.moja_takmicenja[this.curr_takmicenje_index].grupa = grupa;
    const id_tak = this.moja_takmicenja[this.curr_takmicenje_index].id;

    if(grupa === 'cetvrtina finala')
    {
      this.delegat_service.dohvati_sve_zdreb(id_tak).subscribe((zdrebovi : ZdrebClass[]) => {
        this.zdrebovi = zdrebovi;
        const gA : ZdrebClass[] = [];
        const gB : ZdrebClass[] = [];

        this.zdrebovi.forEach(el => {
          if(el.grupa == 'A') gA.push(el);
          if(el.grupa == 'B') gB.push(el);
        });

        gA.sort(this.sort_eliminaciona_faza);
        gB.sort(this.sort_eliminaciona_faza);

        console.log(gA);
        console.log(gB);
        let cntA = 0;
        let cntB = 3;
        let baza_grupa;

        for(let x = 0; x < 4; x++)
        {
          let timA;
          let timB;

          timA = gA[cntA].ekipa;
          timB = gB[cntB].ekipa;

          baza_grupa = 'cetvrtina finala - ' + (x+1);

          let ek = new EkipniRezultatiClass(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, timA, timB, baza_grupa);
          
          //Za prikaz
          if(this.ekipniRez_cetvrtina.length == 0)
          {
            this.ekipniRez_cetvrtina.push(ek);
            this.addItem_kolo(6);
          }

          //
          this.delegat_service.setTim_eliminaciona_faza(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, timA, timB, baza_grupa).subscribe((odg) => {
            console.log(odg['message']);
          })

          if(x == 0)
          {
            cntA = 2; cntB = 1;
          }
          if(x == 1)
          {
            cntA = 3; cntB = 0;
          }
          if(x == 2)
          {
            cntA = 1; cntB = 2;
          }
        };
      });
    }

    if(grupa == 'polufinale')
    {
      this.delegat_service.dohvati_ekipneRez_za_datu_grupnuFazu(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, 'cetvrtina finala').subscribe((rezultati : EkipniRezultatiClass[]) => {
        this.ekipniRez_cetvrtina = rezultati;

        let poluf1_timA;
        let poluf1_timB;
        let poluf2_timA;
        let poluf2_timB;
        let temp;

        //Polufinale - 1
        this.ekipniRez_cetvrtina.forEach(rez => {
          if(rez.br_p1 > rez.br_p2)
          {
            temp = rez.tim1;
          }
          else {
            temp = rez.tim2;
          }

          if(rez.grupna_faza.match(/(cetvrtina finala - 1)/)){
            poluf1_timA = temp;
          }
          else if(rez.grupna_faza.match(/(cetvrtina finala - 2)/)){
            poluf1_timB = temp;
          }
          else if(rez.grupna_faza.match(/(cetvrtina finala - 3)/)){
            poluf2_timA = temp;
          } 
          else {
            poluf2_timB = temp;
          }
        });

        this.delegat_service.setTim_eliminaciona_faza(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, poluf1_timA, poluf1_timB, 'polufinale - 1').subscribe((odg) => {
          console.log(odg['message']);
        })
        this.delegat_service.setTim_eliminaciona_faza(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, poluf2_timA, poluf2_timB, 'polufinale - 2').subscribe((odg) => {
          console.log(odg['message']);
        })


        let pf1 = new EkipniRezultatiClass(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, poluf1_timA, poluf1_timB, 'polufinale - 1');
        let pf2 = new EkipniRezultatiClass(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, poluf2_timA, poluf2_timB, 'polufinale - 2');

        //Da bi se videle promene direktno bez osvezavanja stranice.
        if(this.ekipniRez_poluf.length == 0)
        {
          this.ekipniRez_poluf.push(pf1);
          this.ekipniRez_poluf.push(pf2);
          this.addItem_kolo(7);
          this.addItem_kolo(7);
        }

        console.log(this.ekipniRez_poluf);
        
      });
    }

    if(grupa == "finale")
    {
      this.delegat_service.dohvati_ekipneRez_za_datu_grupnuFazu(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, 'polufinale').subscribe((rezultati : EkipniRezultatiClass[])=>{
        this.ekipniRez_poluf = rezultati;

        let finale_timA : string = '-';
        let finale_timB : string = '-';
        let trecem_timA;
        let trecem_timB;

        this.ekipniRez_poluf.forEach(rez => {
          if(finale_timA === '-')
          {
            finale_timA = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
            trecem_timA = (rez.br_p1 > rez.br_p2 ? rez.tim2 : rez.tim1);
          }
          else if(finale_timB === '-')
          {
            finale_timB = (rez.br_p1 > rez.br_p2 ? rez.tim1 : rez.tim2);
            trecem_timB = (rez.br_p1 > rez.br_p2 ? rez.tim2 : rez.tim1);
          }

        });

        this.delegat_service.setTim_eliminaciona_faza(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, finale_timA, finale_timB, 'finale').subscribe((odg) => {
          console.log(odg['message']);
        });
        
        this.delegat_service.setTim_eliminaciona_faza(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, trecem_timA, trecem_timB, 'trece mesto').subscribe((odg) => {
          console.log(odg['message']);
        });

        let ek = new EkipniRezultatiClass(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, finale_timA, finale_timB, 'finale');
        let ek_trecem = new EkipniRezultatiClass(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, trecem_timA, trecem_timB, 'trece mesto');

        if(this.ekipniRez_finale.length == 0)
        {
          this.ekipniRez_finale.push(ek);
          this.ekipniRez_trecem.push(ek_trecem);
          this.addItem_kolo(8); //Ovo dodaje kontrolu i za trece mesto i za finale
          this.addItem_kolo(9);
        }
      });
    }

    this.delegat_service.promeni_grupu_takmicenju_individ(idTak, grupa).subscribe((odg) => {
      alert(odg['message']);
    })
  }

  onClick_unos_poena_trecem(i)
  {
    let idTak = this.form_ekipniSport.get('takmicenje').value;
    let selected_sport = this.form_ekipniSport.get('sport').value;
    let selected_disc = this.form_ekipniSport.get('disc').value;

    const br_p1 : number = parseInt(this.kolo_TreceForms.at(i).get('tim1').value);
    const br_p2 : number = parseInt(this.kolo_TreceForms.at(i).get('tim2').value);
    const tim1 = this.ekipniRez_trecem[i].tim1;
    const tim2 = this.ekipniRez_trecem[i].tim2;

    this.ekipniRez_trecem[i].br_p1 = br_p1;
    this.ekipniRez_trecem[i].br_p2 = br_p2;


    this.delegat_service.unos_poena(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, tim1, tim2, br_p1, br_p2, 'trece mesto').subscribe((odg) => {
      alert(odg['message']);
    })
  }

  onClick_kraj_takmicenja()
  {
    let trece_m;
    let drugo_m;
    let prvo_m;
    let idTak = this.form_ekipniSport.get('takmicenje').value;
    
    console.log('pozvana');
    this.delegat_service.dohvati_ekipneRez_za_datu_grupnuFazu(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, 'finale').subscribe((odg : EkipniRezultatiClass[]) => {
      console.log("ODGOVOR");
      console.log(odg);
      prvo_m = (odg[0].br_p1 > odg[0].br_p2 ? odg[0].tim1 : odg[0].tim2);
      drugo_m = (odg[0].br_p1 > odg[0].br_p2 ? odg[0].tim2 : odg[0].tim1);
      console.log(prvo_m);
      console.log(drugo_m);

      this.delegat_service.dohvati_ekipneRez_za_datu_grupnuFazu(idTak, this.selected_ekipni_sport, this.selected_ekipna_disc, 'trece mesto').subscribe((odg2 : EkipniRezultatiClass[]) => {
        trece_m = (odg2[0].br_p1 > odg2[0].br_p2 ? odg2[0].tim1 : odg2[0].tim2);
        console.log(trece_m);

        let sport_disc = this.selected_ekipni_sport + ' | ' + this.selected_ekipna_disc;

        console.log(sport_disc);

        this.delegat_service.unesi_medalje_ekipni(prvo_m, drugo_m, trece_m, sport_disc).subscribe((odg) => {
          //medalje unete
        })

        this.delegat_service.set_ima_medalju(this.selected_ekipni_sport, prvo_m, drugo_m, trece_m).subscribe((odg) => {
          //
        })

      });
    });


    this.delegat_service.oznaci_kraj_individ(idTak).subscribe(odg => {});
  }



  // Ova metoda se poziva iz onChange_disc_ekipni, ako postoji napravljen raspored.
  dovuciUtakmice()
  {
    this.delegat_service.dohvati_ekipne_rezultate_Service(this.selected_ekipni_sport, this.selected_ekipna_disc).subscribe((rez : EkipniRezultatiClass[]) => {
      this.svi_ekipni_rezultati = rez;

      this.svi_ekipni_rezultati.forEach(element => {
        if(element.grupna_faza == '1. kolo')
        {
          if(element.br_p1 == -1 && element.vreme != '-')
          {
            this.addItem_kolo(1);
            this.ekipniRez_kolo1.push(element);
          }
        }
        if(element.grupna_faza == '2. kolo')
        {
          if(element.br_p1 == -1 && element.vreme != '-')
          {
            this.addItem_kolo(2);
            this.ekipniRez_kolo2.push(element);
          }
        }
        if(element.grupna_faza == '3. kolo')
        {
          if(element.br_p1 == -1 && element.vreme != '-')
          {
            this.addItem_kolo(3);
            this.ekipniRez_kolo3.push(element);
          }
        }
        if(element.grupna_faza == '4. kolo')
        {
          if(element.br_p1 == -1 && element.vreme != '-')
          {
            this.addItem_kolo(4);
            this.ekipniRez_kolo4.push(element);
          }
        }
        if(element.grupna_faza == '5. kolo')
        {
          if(element.br_p1 == -1 && element.vreme != '-')
          {
            this.addItem_kolo(5);
            this.ekipniRez_kolo5.push(element);
          }
        }
        if(element.grupna_faza.match(/(cetvrtina finala)/))
        {
          if(element.tim1 != '-')   //SAMO AKO POSTOJI FORMIRANA UTAKMICA, odnosno dodeljeni su timovi koji igraju, onda da imam lokalno te utakmice, inace mi ne trebaju
          {
            this.addItem_kolo(6);
            this.ekipniRez_cetvrtina.push(element);
          }
        }
        if(element.grupna_faza.match(/(polu)/))
        {
          if(element.tim1 != '-')
          {
            console.log(element.grupna_faza + ' dodajem u polufinaliste');
            this.addItem_kolo(7);
            this.ekipniRez_poluf.push(element);
          }
        }
        if(element.grupna_faza == "finale")
        {
          if(element.tim1 != '-')
          {
            this.addItem_kolo(8);
            this.ekipniRez_finale.push(element);
          }
        }
        if(element.grupna_faza == "trece mesto")
        {
          if(element.tim1 != '-')
          {
            this.addItem_kolo(9);
            this.ekipniRez_trecem.push(element);
          }
        }
        

        if(element.lokacija == '-')
          this.ekipne_utakmice.push(element.tim1 + ' - ' + element.tim2 + " | " + element.grupna_faza);
      });

    })

  };

  sort_eliminaciona_faza(z1, z2)
  {
    if(z2.bodovi == z1.bodovi)
    {
      if(z2.br_p - z1.br_p > 0)
      {
        return 1;
      }
      else return -1;
    } 
    if(z2.bodovi - z1.bodovi > 0)
    {
      return 1;
    }
    else return -1;
  };

  edit_panel_header(i)
  {
    let clicked_anchor_tag;
    let panel_tab_toShow;

    if(i == 1)
    {
      clicked_anchor_tag = 'a-kolo-1';
      panel_tab_toShow = 'div-1-kolo';
    }
    if(i == 2)
    {
      clicked_anchor_tag = 'a-kolo-2';
      panel_tab_toShow = 'div-2-kolo';
    }
    if(i == 3)
    {
      clicked_anchor_tag = 'a-kolo-3';
      panel_tab_toShow = 'div-3-kolo';
    }
    if(i == 4)
    {
      clicked_anchor_tag = 'a-kolo-4';
      panel_tab_toShow = 'div-4-kolo';
    }
    if(i == 5)
    {
      clicked_anchor_tag = 'a-kolo-5';
      panel_tab_toShow = 'div-5-kolo';
    }
    if(i == 6)
    {
      clicked_anchor_tag = 'a-cetvf';
      panel_tab_toShow = 'div-cetvf'
    }
    if(i == 7)
    {
      clicked_anchor_tag = 'a-poluf';
      panel_tab_toShow = 'div-poluf'
    }
    if(i == 8)
    {
      clicked_anchor_tag = 'a-finale';
      panel_tab_toShow = 'div-finale'
    }
    if(i == 9)
    {
      clicked_anchor_tag = 'a-trece-mesto';
      panel_tab_toShow ='div-trece-mesto';
    }
    
    //... dodati do 5
  
    const divv = document.querySelectorAll('p.panel-tabs > a');

    divv.forEach(el => {
      if(el.classList.contains('is-active')){
        el.classList.remove('is-active');
      }
    })

    const container = document.getElementById('tab-selector');
    const panel_content = container.querySelectorAll('div.tab-selector')

    panel_content.forEach((el => {
      if(el.classList.contains('is-active')){
        el.classList.replace('is-active', 'is-hidden');
      }
    }))


    document.getElementById(clicked_anchor_tag).classList.add('is-active');
    document.getElementById(panel_tab_toShow).classList.replace('is-hidden', 'is-active');

  };








}
