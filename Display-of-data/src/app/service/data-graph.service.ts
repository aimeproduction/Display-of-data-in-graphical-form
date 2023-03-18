import { Injectable } from '@angular/core';
import {filter, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {cityNode} from "../models/cityNode";
import {cityData} from "../models/cityData";

@Injectable({
  providedIn: 'root'
})
export class DataGraphService {
data!: cityData[];
  constructor(private  http: HttpClient) { }
  getAllData(): Observable<cityNode[]>{
    return this.http.get<cityNode[]>("http://localhost:3000/treenode")
  }
  getCityDatabyName(name: string){
    return this.http.get<cityData[]>("http://localhost:3000/data/")
  }
}
