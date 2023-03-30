import {Component, OnInit} from '@angular/core';
import {DashboardName} from "../../../../../models/dashboard-name";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataGraphService} from "../../../../../service/data-graph.service";
import {DashboardTemplate} from "../../../../../models/dashboard-template";
import {DiagramTemplate} from "../../../../../models/diagram-template";

@Component({
  selector: 'app-add-diagrams-template-to-dashboard',
  templateUrl: './add-diagrams-template-to-dashboard.component.html',
  styleUrls: ['./add-diagrams-template-to-dashboard.component.css']
})
export class AddDiagramsTemplateToDashboardComponent implements OnInit{
  alltableDatas: DashboardName[] = [];
  warning = '';
  errorMessage = '';
  diagramTitle: string[] = []
  titleDashboard = '';
  iddashboard!: number;
  specificDiagram: string = ''
  specificDashboard: string = '';
  formDashboard!: FormGroup;
  diagram!: DashboardTemplate;
  allDiagramTemplate: DiagramTemplate[] = [];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder, private  service: DataGraphService) {
  }


  ngOnInit() {
    this.formDashboard = this.fb.group({
      DashboardTitle: ['',  Validators.required],
      DiagramToAdd: ['', Validators.required],
      DiagramTemplate: this.diagram,
    });

    this.getDashboardName();
    this.getDiagramTemplate();
  }

  getDiagramTemplate() {
    this.service.getAllDiagramTemplate().subscribe({
      next: (data1) => {
        this.allDiagramTemplate = data1;
       this.allDiagramTemplate.forEach(x => this.diagramTitle.push(x.title))
        console.log(this.allDiagramTemplate)
        console.log(this.diagramTitle)
      },
      error: () => {
        this.errorMessage = 'Die Vorlagen der Diagrammen konnten leider nicht geladen werden. Bitte versuchen Sie noch einmal.'
      }
    })
  }

  getDashboardName() {
    this.service.getAllDashboardName().subscribe({
      next: (data) => {
        this.alltableDatas = data;
        this.errorMessage = '';
      },

      error: () => {
        this.errorMessage = 'Ihr Titel konnte leider nicht gespeichert werden. Bitte prüfen Sie die Verbindung und versuchen Sie noch einmal.'
      },
      complete: () => {

      }
    })

  }
}
