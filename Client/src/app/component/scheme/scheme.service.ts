import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {

  private apiUrl = 'http://localhost:3000/api/scheme';
  

  deleteScheme(id: number){
    return this.http.delete<any>(`http://localhost:3000/api/scheme/${id}`)
  }

  getDetailScheme(id : number){
    
    return this.http.get<any>(`http://localhost:3000/api/scheme/${id}`)
  }

  getScheme(): Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/scheme")
  }

  fetchSchemeById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/scheme/${id}`);
  }

  constructor(private http: HttpClient) { }

  postScheme(data:any){
    return this.http.post<any>("http://localhost:3000/api/scheme", data)
    .pipe(map((res:any)=>{
      console.log(res);
       return res;
    }));
  }

  editScheme(id: number, schemeName: string){
    return this.http.put<any>(`http://localhost:3000/api/scheme/${id}`, {schemeName})
  }
  
  updateScheme(data: any): Observable<any> {
    debugger
    return this.http.put(`http://localhost:3000/api/scheme/${data.id}`, data);
  }
}
