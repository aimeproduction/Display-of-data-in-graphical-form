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
  SelectedLineConfigurationforNewLineComponent
} from "./selected-line-template-update/selected-line-configurationfor-new-line/selected-line-configurationfor-new-line.component";
import {
  SelectedLineConfigurationforUpdateComponent
} from "./selected-line-template-update/selected-line-configurationfor-update/selected-line-configurationfor-update.component";
import {
  SelectedLineConfigurationforDeleteComponent
} from "./selected-line-template-update/selected-line-configurationfor-delete/selected-line-configurationfor-delete.component";

@Component({
  selector: 'app-diagrams',
  templateUrl: './diagrams.component.html',
  styleUrls: ['./diagrams.component.css']
})
export class DiagramsComponent implements OnInit{
  ResponseofTheTemplate: any;
  alltableDatas = [];
  UpdateDiagram = ['Diagramm bearbeiten', 'Diagramm löschen', 'neue Zeile', 'neue Spalte'];
  UpdateColumn = ['Spalte bearbeiten', 'Spalte löschen'];
  UpdateLine = ['Zeile bearbeiten', 'Zeile löschen'];
  linearray = [];
  columnarray = [];
  public formDiagram!: FormGroup;
  iddiagram!: number;
  idline!: number;
  idcolumn!: number;
  queryPath = '';
  diagramtyp ='';
  errorMessage = '';




  constructor(private  title: Title, private http: HttpClient, private fb: FormBuilder, public dialog: MatDialog) {
  }



  ngOnInit() {
    this.onSubmit();
    this.formDiagram = this.fb.group({
      valueToUpdate: [''],
    });
    this.title.setTitle('PaDaWaN/Diagramme');
  }



  onSubmit() {
    const send = this.http.get('http://localhost:9090/RadiologieDashboard/api/diagramConfigurations');
    send.subscribe((data => {
        this.ResponseofTheTemplate = data;

        this.alltableDatas = this.ResponseofTheTemplate._embedded.diagramConfigurationDtoList;
/*        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.alltableDatas.length; i++) {
          this.linearray = this.alltableDatas[i].selectedLines;
          this.columnarray = this.alltableDatas[i].selectedColumns;
        }*/
      }),
      () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      });
  }



  getvalueDiagram(iddiagram: number, valueUpdate: string, path: string, diagramtyp: string) {
    this.queryPath = path;
    this.iddiagram = iddiagram;
    this.diagramtyp = diagramtyp;
    if (valueUpdate === 'Diagramm bearbeiten') {
      this.errorMessage = '';
      this.dialog.open(DiagramConfigurationforUpdateComponent, {
        width: '800px', height: '1000px',
        data: {iddiagram: this.iddiagram}

      });
    } else if (valueUpdate === 'Diagramm löschen') {
      this.errorMessage = '';
      this.dialog.open(DiagramConfigurationforDeleteComponent, {
        width: '600px',
        data: {iddiagram: this.iddiagram}
      });
    } else if (valueUpdate === 'neue Zeile') {
      this.errorMessage = '';
      this.dialog.open(SelectedLineConfigurationforNewLineComponent, {
        width: '800px',
        data: {iddiagram: this.iddiagram, queryPath: this.queryPath, diagramtyp: this.diagramtyp}
      });
    }
    else {
      this.errorMessage = 'wir konnten leider nicht Ihre ausgewählte Operation finden'
    }
  }



  getvalueLine(iddiagram: number, idligne: number, valueUpdateLine: string, path: string) {
    this.queryPath = path;
    this.idline = idligne;
    this.iddiagram = iddiagram;
    if (valueUpdateLine === 'Zeile bearbeiten') {
      this.errorMessage = '';
      this.dialog.open(SelectedLineConfigurationforUpdateComponent, {
        width: '800px', height: '2000px',
        data: {iddiagram: this.iddiagram, idligne: this.idline, queryPath: this.queryPath}
      });
    } else if (valueUpdateLine === 'Zeile löschen') {
      this.errorMessage = '';
      this.dialog.open(SelectedLineConfigurationforDeleteComponent, {
        width: '600px',
        data: {idligne: this.idline, iddiagram: this.iddiagram}
      });
    } else {
      this.errorMessage = 'wir konnten leider nicht Ihre ausgewählte Operation finden.'
    }
  }

}
