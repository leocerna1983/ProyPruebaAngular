import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private myServiceUrl = 'http://localhost:56445/api/tarjeta/';
  constructor(private http:HttpClient) { }

  getListTarjetas():Observable<any>{
    return this.http.get(this.myServiceUrl);
  }

  deleteTarjeta(id:number)
  {
    return this.http.delete(this.myServiceUrl +id);
  }

  saveTarjeta(tarjeta:any):Observable<any>{
    return this.http.post(this.myServiceUrl ,tarjeta);
  }

  updateTarjeta(id:number, tarjeta:any):Observable<any>{
    return this.http.put(this.myServiceUrl+ id ,tarjeta);
  }
}
