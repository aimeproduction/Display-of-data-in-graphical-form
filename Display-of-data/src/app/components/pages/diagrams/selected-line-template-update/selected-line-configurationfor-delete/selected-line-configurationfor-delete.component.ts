import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogData} from "../../../../../models/dialog-data";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DiagramTemplate} from "../../../../../models/diagram-template";
import {DataGraphService} from "../../../../../service/data-graph.service";


@Component({
  selector: 'app-selected-line-configurationfor-delete',
  templateUrl: './selected-line-configurationfor-delete.component.html',
  styleUrls: ['./selected-line-configurationfor-delete.component.css']
})
export class SelectedLineConfigurationforDeleteComponent implements OnInit {
  alltableDatas!: DiagramTemplate;
  errorMessage = '';
  errorMessageLoading = '';
  diagramName!: string;
  formDiagram!: FormGroup;
  lineName!: string;
  lineColor!: string;
  lineData!: { lineName: string; lineColor: string };


  constructor(public dialogRef: MatDialogRef<SelectedLineConfigurationforDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private fb: FormBuilder,
              private _snackBar: MatSnackBar, private service: DataGraphService) {
  }


  ngOnInit(): void {
    this.getTemplateID();
    this.formDiagram = this.fb.group({
      queryPath: [''],
      selectedLinesValue: this.fb.array([]),
      diagramType: [''],
      title: [''],
      id: [''],
    });
  }


  DeleteLine() {
    this.formDiagram.value.title = this.alltableDatas.title;
    this.formDiagram.value.queryPath = this.alltableDatas.queryPath;
    this.formDiagram.value.diagramType = this.alltableDatas.diagramType;
    this.formDiagram.value.id = this.alltableDatas.id;
    this.formDiagram.value.selectedLinesValue = this.alltableDatas.selectedLinesValue.filter(x => x.lineName != this.data.lineName)

    this.service.deleteLinefromDiagramTemplate(this.data.iddiagram, this.formDiagram).subscribe({
      next: () => {
        this.errorMessage = '';
        this._snackBar.open('Das Diagramm wurde erfolgreich geändert', 'Danke', {
          duration: 5000,
        })
        this.errorMessage = '';
        this.ClickClose();
      },
      error: () => {
        this.errorMessage = 'Es war leider nicht möglich Ihre Abfrage an den Server zu schicken. Bitte prüfen Sie ' +
          'Ihre Daten und die Verbindung mit dem Server.'
      },
      complete: () => {

      }
    })
  }


  getTemplateID() {
    this.service.getAllDiagramTemplatebyID(this.data.iddiagram).subscribe({
      next: (data) => {
        this.alltableDatas = data;
        this.diagramName = this.alltableDatas.title;
        for (let i = 0; i < this.alltableDatas.selectedLinesValue.length; i++) {
          if (this.alltableDatas.selectedLinesValue[i].lineName == this.data.lineName) {
            this.lineData = this.alltableDatas.selectedLinesValue[i];
            this.lineName = this.lineData.lineName;
            this.lineColor = this.lineData.lineColor;
          }
        }
      },
      error: () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      }
    })
  }


  ClickClose(): void {
    this.dialogRef.close();
  }
}
