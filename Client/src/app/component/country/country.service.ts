import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CountryModel } from './country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:3000/api/countries';
  

  deleteCountry(id: number){
    debugger
    return this.http.delete<any>(`http://localhost:3000/api/countries/${id}`)
  }

  getDetailCountry(id : number){
    
    return this.http.get<any>(`http://localhost:3000/api/countries/${id}`)
  }

  getCountry(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/countries")
  }

  fetchCountryById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/countries/${id}`);
  }

  constructor(private http: HttpClient) { }

  postCountry(data:any){
    return this.http.post<any>("http://localhost:3000/api/countries", data)
    .pipe(map((res:any)=>{
      console.log(res);
       return res;
    }));
  }

  editCountry(id: number, countryName: string){
    return this.http.put<any>(`http://localhost:3000/api/countries/${id}`, {countryName})
  }
  
  updateCountry(data: any): Observable<any> {
    debugger
    return this.http.put(`http://localhost:3000/api/countries/${data.id}`, data);
  }
  
  // getCountry(): Observable<any> {
  //   return this.http.get<any>("http://localhost:3000/Country")
  // }


  // addCountry(countryName: string): Observable<any> {
  //   return this.http.post<any>(this.apiUrl, { countryName });
  // }

  // getDetailCountry(): Observable<any[]> {
  //   return this.http.get<any[]>(`http://localhost:3000/Country?id=${id}`);
  // }

  // deleteCountry(id: number): Observable<void> {
  //   return this.http.delete<void>(`http://localhost:3000/Country?${id}`);
  // }

  // editCountry(id: number){
  //        return this.http.get<any>(`http://localhost:3000/Country?id=${id}`)
  //      }

  getAllUser(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/dashboard")
  }
     
}






 



