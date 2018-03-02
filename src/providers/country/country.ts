import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryModel } from '../../models/country.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CountryProvider {

  constructor(public http: HttpClient) {    
  }

  private apiUrl = 'https://restcountries.eu/rest/v2/';

  private countries: CountryModel[] = [];

  getCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(this.apiUrl + 'all');
  }

  getSearch(name: string): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${this.apiUrl}/name/${name}`);
  }

}
