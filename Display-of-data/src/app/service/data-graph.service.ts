import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {Response} from "../models/response";
import {HttpClient} from "@angular/common/http";
import {QueryData} from "../models/queryData";

@Injectable({
  providedIn: 'root'
})
export class DataGraphService {

  constructor(private  http: HttpClient) { }
  getAllData(): Observable<QueryData[]>{
    return this.http.get<QueryData[]>("http://localhost:3000/queries").pipe(tap(res =>{

      }

    ));
  }
}
