import { Injectable } from '@angular/core';
import {filter, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {cityNode} from "../models/cityNode";
import {cityData} from "../models/cityData";
import {CityName} from "../models/city-name";
import {FormGroup} from "@angular/forms";
import {DiagramTemplate} from "../models/diagram-template";

@Injectable({
  providedIn: 'root'
})
export class DataGraphService {
data!: cityData[];
  constructor(private  http: HttpClient) { }
  getAllData(): Observable<cityNode[]>{
    return this.http.get<cityNode[]>("http://localhost:3000/treenode")
  }
  getCityDatabyCityName(){
    return this.http.get<cityData[]>("http://localhost:3000/data")
  }

  getCityLineName(){
    return this.http.get<CityName[]>("http://localhost:3000/dataname")
  }
  getAllDiagramTemplate(){
    return this.http.get<DiagramTemplate[]>("http://localhost:3000/diagramtemplate")
  }

  getAllDiagramTemplatebyID(id: number){
    return this.http.get<DiagramTemplate>("http://localhost:3000/diagramtemplate/" + id)
  }
  postData(form: FormGroup){
    return this.http.post<DiagramTemplate>("http://localhost:3000/diagramtemplate", form.value);
  }
  updateDiagramTemplate(id: number, form: FormGroup){
    return this.http.put<DiagramTemplate>("http://localhost:3000/diagramtemplate/"+id, form.value);
  }
  deleteDiagramTemplate(id: number){
    return this.http.delete<DiagramTemplate>("http://localhost:3000/diagramtemplate/"+id);
  }
  deleteLinefromDiagramTemplate(id: number, form: FormGroup){
    return this.http.put<DiagramTemplate>("http://localhost:3000/diagramtemplate/"+id, form.value);
  }
  updateLinefromDiagramTemplate(id: number, form: FormGroup){
    return this.http.put<DiagramTemplate>("http://localhost:3000/diagramtemplate/"+id, form.value);
  }
}
