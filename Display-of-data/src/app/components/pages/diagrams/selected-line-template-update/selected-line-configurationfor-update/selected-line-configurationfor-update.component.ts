import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogData} from "../../../../../models/dialog-data";
import {DataGraphService} from "../../../../../service/data-graph.service";
import {DiagramTemplate} from "../../../../../models/diagram-template";


@Component({
  selector: 'app-selected-line-configurationfor-update',
  templateUrl: './selected-line-configurationfor-update.component.html',
  styleUrls: ['./selected-line-configurationfor-update.component.css']
})
export class SelectedLineConfigurationforUpdateComponent implements OnInit{

  public form!: FormGroup;
  public formular!: FormGroup;
  errorMessage = '';
  TheLineName = '';
  theLineColor = '';
  alltableDatas!: DiagramTemplate[]
  lineData!: { lineName: string; lineColor: string }

  constructor(public dialogRef: MatDialogRef<SelectedLineConfigurationforUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private fb: FormBuilder,
              private _snackBar: MatSnackBar, private service: DataGraphService) {
  }



  ngOnInit() {
    this.getTemplate();
    this.form = this.fb.group({
      linePosition: [],
      lineName: [this.TheLineName, Validators.required],
      lineColor: [this.theLineColor, Validators.required],
    });



    this.formular = this.fb.group({
      idDiagram: [''],
      idLine: [''],
    });
  }


  getTemplate() {
    this.service.getAllDiagramTemplate().subscribe({
      next: (data) => {
        this.alltableDatas = data;
        for( let i=0; i< this.alltableDatas.length;i++) {
          for( let j=0; j< this.alltableDatas[i].selectedLinesValue.length;j++) {
            if (this.alltableDatas[i].selectedLinesValue[j].lineName == this.data.lineName) {
              this.lineData = this.alltableDatas[i].selectedLinesValue[i];
              console.log(this.lineData)
            }
          }
        }
      },
      error: () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      }
    })
  }
}
