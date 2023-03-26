import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../../models/dialog-data";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DiagramTemplate} from "../../../../../models/diagram-template";
import {DataGraphService} from "../../../../../service/data-graph.service";

@Component({
  selector: 'app-diagram-configurationfor-delete',
  templateUrl: './diagram-configurationfor-delete.component.html',
  styleUrls: ['./diagram-configurationfor-delete.component.css']
})
export class DiagramConfigurationforDeleteComponent implements OnInit {
  alltableDatas!: DiagramTemplate;
  errorMessage = '';
  errorMessageLoading = '';
  LineNumber = 0;


  constructor(public dialogRef: MatDialogRef<DiagramConfigurationforDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private fb: FormBuilder,
              private _snackBar: MatSnackBar, private service: DataGraphService) {
  }


  ngOnInit(): void {
    this.getTemplateID();
  }


  DeletebyId() {

    this.service.deleteDiagramTemplate(this.data.iddiagram).subscribe({
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
        this.LineNumber = this.alltableDatas.selectedLinesValue.length;
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
