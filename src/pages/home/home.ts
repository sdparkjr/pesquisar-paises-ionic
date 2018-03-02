import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { CountryModel } from '../../models/country.model';
import { FormControl } from '@angular/forms';
import { CountryProvider } from '../../providers/country/country';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  listcountries: CountryModel[] = [];
  //paises: PaisModel[] = [];
  errorMessage: string;
  load: any;
  pesquisar: '';
  pesquisarControl: FormControl;

  constructor(public navCtrl: NavController,    
    private _countryServ: CountryProvider,
    private _loadingCtr: LoadingController,
    private _alertCtrl: AlertController, ) {

    this.pesquisarControl = new FormControl();
  }

  ionViewDidLoad() {

      this.getAllCountries();

    this.pesquisarControl.valueChanges.debounceTime(700).subscribe(search => {
      console.log(search);
      if (search !== '') {
        this.getSearchCountry();
      } else {
        this.getAllCountries();
      }
    });
  }

  getAllCountries() {
    
    this.openLoad('Listando Paises');
    this._countryServ.getCountries().subscribe(resultado => this.listcountries = resultado,
      (error: Response | any) => {
        //  console.log(error);
        this.closeLoad();
        let alert = this._alertCtrl.create({ message: `Ocorreu um erro:`, title: 'Falha', buttons: [{ text: 'Estou cinte!' }] });
        alert.present();
      },
      () => {
        //console.log("terminou"); 
        this.closeLoad();
      });

  }

  getSearchCountry() {
    
    //pesquisar na lista que está online
    let list = this.listcountries.filter(it => {
      return it.name.toLowerCase().includes(this.pesquisar.toLowerCase()); //filtro com dados online
    });

    if (list.length > 0) {
      this.listcountries = list;
    } else {
      //pesquisa na Api
      this._countryServ.getSearch(this.pesquisar).subscribe(
        resultado => this.listcountries = resultado, 
        () => { }
      );
    }

  }



  ///////////Alert Modal/////////////////
  openLoad(msg: string) {
    this.load = this._loadingCtr.create({ content: msg });
    this.load.present();
  }
  closeLoad() {
    this.load.dismiss();
  }
}
