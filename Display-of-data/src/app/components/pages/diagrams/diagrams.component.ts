import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {
  DiagramConfigurationforUpdateComponent
} from "./diagram-template-update/diagram-configurationfor-update/diagram-configurationfor-update.component";
import {
  DiagramConfigurationforDeleteComponent
} from "./diagram-template-update/diagram-configurationfor-delete/diagram-configurationfor-delete.component";
import {
  SelectedLineConfigurationforUpdateComponent
} from "./selected-line-template-update/selected-line-configurationfor-update/selected-line-configurationfor-update.component";
import {
  SelectedLineConfigurationforDeleteComponent
} from "./selected-line-template-update/selected-line-configurationfor-delete/selected-line-configurationfor-delete.component";
import {DiagramTemplate} from "../../../models/diagram-template";
import {DataGraphService} from "../../../service/data-graph.service";
import {DiagramLineTemplate} from "../../../models/diagram-line-template";
import {
  DiagramConfigurationforNewLineComponent
} from "./diagram-template-update/diagram-configurationfor-new-line/diagram-configurationfor-new-line.component";

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit{
  alltableDatas!: DiagramTemplate [];
  UpdateDiagram = ['Diagramm bearbeiten', 'Diagramm löschen', 'neue Zeile'];
  linearray!: DiagramLineTemplate [];
  public formDiagram!: FormGroup;
  iddiagram!: number;
  lineName!: string;
  queryPath = '';
  diagramtyp ='';
  errorMessage = '';
  valueUpdate =''



  constructor(private  title: Title, private http: HttpClient, private service: DataGraphService, private fb: FormBuilder, public dialog: MatDialog) {
  }



  ngOnInit() {
    this.getTemplate();
    this.formDiagram = this.fb.group({
      valueToUpdate: [''],
    });
  }




  getTemplate() {
    this.service.getAllDiagramTemplate().subscribe({
      next: (data) => {
        this.alltableDatas = data;
        for( let i=0; i< this.alltableDatas.length;i++) {
          // @ts-ignore
          this.linearray.push(this.alltableDatas[i].selectedLinesValue);
        }
      },
      error: () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      }
    })
  }



  getvalueDiagram(item: DiagramTemplate, form: FormGroup) {
    this.queryPath = item.queryPath;
    this.iddiagram = item.id;
    this.diagramtyp = item.diagramType;
    this.valueUpdate = form.value.valueToUpdate;
    if (this.valueUpdate === 'Diagramm bearbeiten') {
      this.errorMessage = '';
      this.dialog.open(DiagramConfigurationforUpdateComponent, {
        width: '500px', height: '550px',
        data: {iddiagram: this.iddiagram}

      });
    } else if (this.valueUpdate === 'Diagramm löschen') {
      this.errorMessage = '';
      this.dialog.open(DiagramConfigurationforDeleteComponent, {
        width: '600px', height: '550px',
        data: {iddiagram: this.iddiagram}
      });
    } else if (this.valueUpdate === 'neue Zeile') {
      this.errorMessage = '';
      this.dialog.open(DiagramConfigurationforNewLineComponent, {
        width: '800px',
        data: {iddiagram: this.iddiagram, queryPath: this.queryPath, diagramtyp: this.diagramtyp}
      });
    }
    else {
      this.errorMessage = 'wir konnten leider nicht Ihre ausgewählte Operation finden'
    }
  }



  getvalueLine(iddiagram: number, lineName: string, valueUpdateLine: string, path: string) {
    this.queryPath = path;
    this.lineName = lineName;
    this.iddiagram = iddiagram;
    if (valueUpdateLine === 'Zeile bearbeiten') {
      this.errorMessage = '';
      console.log(lineName)
      this.dialog.open(SelectedLineConfigurationforUpdateComponent, {
        width: '800px', height: '2000px',
        data: {iddiagram: this.iddiagram, lineName: this.lineName, queryPath: this.queryPath}
      });
    } else if (valueUpdateLine === 'Zeile löschen') {
      this.errorMessage = '';
      this.dialog.open(SelectedLineConfigurationforDeleteComponent, {
        width: '600px',
        data: {lineName: this.lineName, iddiagram: this.iddiagram}
      });
    } else {
      this.errorMessage = 'wir konnten leider nicht Ihre ausgewählte Operation finden.'
    }
  }

}
