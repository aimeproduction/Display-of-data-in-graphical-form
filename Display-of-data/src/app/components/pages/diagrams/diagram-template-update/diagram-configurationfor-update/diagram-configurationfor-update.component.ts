import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../../../../../models/dialog-data";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DiagramTemplate} from "../../../../../models/diagram-template";
import {DataGraphService} from "../../../../../service/data-graph.service";

@Component({
  selector: 'app-diagram-configurationfor-update',
  templateUrl: './diagram-configurationfor-update.component.html',
  styleUrls: ['./diagram-configurationfor-update.component.css']
})
export class DiagramConfigurationforUpdateComponent implements OnInit{
  thetitel!: string;
  thediagramtyp!: string;
  thepath!: string;
  colors = ['RED', 'GREEN', 'YELLOW', 'BLUE', 'PURPLE', 'BROWN', 'PINK', 'GRAY', 'ORANGE','BLACK'];
  DiagramTyp = ['PIECHART', 'BARCHART', 'LINECHART', 'DOUGHNUTCHART'];
  public formDiagram!: FormGroup;
  public formular!: FormGroup;
  errorMessage = '';
  alltableDatasLines!: [{ lineName: string; lineColor: string }];
  alltableDatas!: DiagramTemplate


  constructor(public dialogRef: MatDialogRef<DiagramConfigurationforUpdateComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, private fb: FormBuilder,
              private _snackBar: MatSnackBar, private service: DataGraphService) {
  }



  ngOnInit() {
    this.getTemplateID();
    this.formDiagram = this.fb.group({
      queryPath: [''],
      selectedLinesValue: this.fb.array([]),
      diagramType: [this.thediagramtyp],
      title: [this.thetitel],
      id: [''],
    });



    this.formular = this.fb.group({
      idDiagram: [''],
      idLine: [''],
    });
  }

  ClickClose(): void {
    this.dialogRef.close();
  }

  addGroupHead(title: string, diagramType: string, queryPath: string) {
    this.fb.group({
      diagramType: [diagramType],
      title: [title],
      queryPath: [queryPath]
    });
  }




  addGroupSelectedLine(lineName: string, lineColor: string) {
    const val = this.fb.group({
      lineName: [lineName],
      lineColor: [lineColor, Validators.required],
    });

    const form = this.formDiagram.get('selectedLinesValue') as FormArray;
    form.push(val);
  }

  getTemplateID() {
    this.service.getAllDiagramTemplatebyID(this.data.iddiagram).subscribe({
      next: (data) => {
        this.alltableDatas = data;
        this.alltableDatasLines = this.alltableDatas.selectedLinesValue;
        this.thetitel = this.alltableDatas.title;
        this.thediagramtyp = this.alltableDatas.diagramType;
        this.thepath = this.alltableDatas.queryPath;
        for (let i = 0; i < this.alltableDatasLines.length; i++) {
          this.addGroupSelectedLine(this.alltableDatasLines[i].lineName,
            this.alltableDatasLines[i].lineColor);
        }
        this.addGroupHead(this.thetitel, this.thediagramtyp, this.thepath);
        console.log(data)

      },
      error: () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      }
    })
  }

  onSubmit() {
    this.formDiagram.value.queryPath = this.thepath;
    this.formDiagram.value.id = this.data.iddiagram;
    console.log(this.data.iddiagram)
    console.log(this.formDiagram.value)
    this.service.updateDiagramTemplate(this.data.iddiagram, this.formDiagram).subscribe({
      next: () => {
        this.errorMessage = '';
        this._snackBar.open('Das Diagramm wurde erfolgreich geändert', 'Danke', {
          duration: 5000,
        })
        this.errorMessage = '';
        this.formDiagram.reset();
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

}
