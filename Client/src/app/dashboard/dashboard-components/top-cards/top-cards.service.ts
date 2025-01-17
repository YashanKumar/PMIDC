import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopcardService {

  private apiUrl = 'http://localhost:3000/api/dashboard'; 

  constructor(private http: HttpClient) { }

  getTopcardsData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/dashboard');
  }

  
}
