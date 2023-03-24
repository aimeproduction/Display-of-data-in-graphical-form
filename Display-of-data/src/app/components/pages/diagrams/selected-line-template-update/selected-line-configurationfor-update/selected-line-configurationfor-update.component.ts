import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogData} from "../../../../../models/dialog-data";
import {DataGraphService} from "../../../../../service/data-graph.service";
import {DiagramTemplate} from "../../../../../models/diagram-template";
import {DiagramLineTemplate} from "../../../../../models/diagram-line-template";
import {cityData} from "../../../../../models/cityData";
import {CityName} from "../../../../../models/city-name";


@Component({
  selector: 'app-selected-line-configurationfor-update',
  templateUrl: './selected-line-configurationfor-update.component.html',
  styleUrls: ['./selected-line-configurationfor-update.component.css']
})
export class SelectedLineConfigurationforUpdateComponent implements OnInit{
  colors = ['RED', 'GREEN', 'YELLOW', 'BLUE', 'PURPLE', 'BROWN', 'PINK', 'GRAY', 'ORANGE','BLACK'];
  linearray: string [] =[];
  freeLine: string [] =[];
  alltableDatas!: DiagramTemplate;
  errorMessage = '';
  errorMessageLoading = '';
  diagramName!: string;
  formDiagram!: FormGroup;
  form!: FormGroup;
  lineName!: string;
  lineColor!: string;
  lineData!: { lineName: string; lineColor: string };
  linePosition =0;
  cityData!: CityName[];
  abteilung1!: string;
  abteilung2!: string;
  abteilung3!: string;
  abteilung4!: string;
  abteilung5!: string;
  abteilung6!: string;
  abteilung7!: string;
  abteilung8!: string;
  abteilung9!: string;
  abteilung10!: string
  myarray: string[] = [];
  arrayColor: string [] = [];
  colorLineArray: string [] = [];

  constructor(public dialogRef: MatDialogRef<SelectedLineConfigurationforUpdateComponent>,
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

    this.form = this.fb.group({
      lineName: [''],
      lineColor: [''],
    });
  }


  updateLine() {
    this.formDiagram.value.title = this.alltableDatas.title;
    this.formDiagram.value.queryPath = this.alltableDatas.queryPath;
    this.formDiagram.value.diagramType = this.alltableDatas.diagramType;
    this.formDiagram.value.id = this.alltableDatas.id;
    this.alltableDatas.selectedLinesValue[this.linePosition].lineName = this.lineName;
    this.alltableDatas.selectedLinesValue[this.linePosition].lineColor = this.lineColor;
    this.formDiagram.value.selectedLinesValue = this.alltableDatas.selectedLinesValue;
    this.service.updateLinefromDiagramTemplate(this.data.iddiagram, this.formDiagram).subscribe({
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
        this.getCityData(this.alltableDatas.queryPath)
        this.listofLinename(this.alltableDatas.selectedLinesValue)
        for( let i=0; i< this.alltableDatas.selectedLinesValue.length;i++) {
          this.colorLineArray.push(this.alltableDatas.selectedLinesValue[i].lineColor)
          if(this.alltableDatas.selectedLinesValue[i].lineName == this.data.lineName) {
            this.linePosition = i;
            this.lineData = this.alltableDatas.selectedLinesValue[i];
            this.lineName = this.lineData.lineName;
            this.lineColor= this.lineData.lineColor;
          }
        }

        this.arrayColor = this.colors.filter(x => !this.colorLineArray.includes(x))
        this.arrayColor.push(this.lineColor)
        console.log(this.arrayColor)
      },
      error: () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      }
    })
  }

  getCityData(name: string) {
    console.log('hi'+ name)
    this.service.getCityLineName().subscribe({
      next: (data) => {
        this.cityData = data.filter(element => element.name == name)
        this.abteilung1 = this.cityData[0].abteilung1;
        this.abteilung2 = this.cityData[0].abteilung2;
        this.abteilung3 = this.cityData[0].abteilung3;
        this.abteilung4 = this.cityData[0].abteilung4;
        this.abteilung5 = this.cityData[0].abteilung5;
        this.abteilung6 = this.cityData[0].abteilung6;
        this.abteilung7 = this.cityData[0].abteilung7;
        this.abteilung8 = this.cityData[0].abteilung8;
        this.abteilung9 = this.cityData[0].abteilung9;
        this.abteilung10 = this.cityData[0].abteilung10;
        this.myarray.push(this.abteilung1)
        this.myarray.push(this.abteilung2)
        this.myarray.push(this.abteilung3)
        this.myarray.push(this.abteilung4)
        this.myarray.push(this.abteilung5)
        this.myarray.push(this.abteilung6)
        this.myarray.push(this.abteilung7)
        this.myarray.push(this.abteilung8)
        this.myarray.push(this.abteilung9)
        this.myarray.push(this.abteilung10)
        this.freeLine = this.myarray.filter(x => !this.linearray.includes(x))
        this.freeLine.push(this.lineName)
      },
      error: () => {
        console.log('big error')
      }
    })
  }
  listofLinename(lineArray: [{ lineName: string; lineColor: string }]){
    for(let i=0; i< lineArray.length; i++){
      this.linearray.push(lineArray[i].lineName)
    }
console.log(this.linearray)
  }


  ClickClose(): void {
    this.dialogRef.close();
  }
}
