import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {cityNode} from "../models/cityNode";

@Injectable({
  providedIn: 'root'
})
export class DataGraphService {

  constructor(private  http: HttpClient) { }
  getAllData(): Observable<cityNode[]>{
    return this.http.get<cityNode[]>("http://localhost:3000/treenode").pipe(tap(res =>{

      }

    ));
  }
}
