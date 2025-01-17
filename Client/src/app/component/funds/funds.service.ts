import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FundsService {
  private apiUrl = 'http://localhost:3000/api/funds';
  

  deleteFunds(id: number){
    return this.http.delete<any>(`http://localhost:3000/api/funds/${id}`)
  }

  getDetailFunds(id : number){
    
    return this.http.get<any>(`http://localhost:3000/api/funds/${id}`)
  }

  getFunds(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/funds")
  }

  fetchFundsById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/funds/${id}`);
  }

  constructor(private http: HttpClient) { }

  postFunds(data:any){
    debugger;
    return this.http.post<any>("http://localhost:3000/api/funds", data)
    .pipe(map((res:any)=>{
      console.log(res);
       return res;
    }));
  }

  editFunds(id: number, funds: string){
    return this.http.put<any>(`http://localhost:3000/api/funds/${id}`, {funds})
  }
  
  updateFunds(data: any): Observable<any> {
    debugger
    return this.http.put(`http://localhost:3000/api/funds/${data.id}`, data);
  }
     
}