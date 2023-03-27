import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  ControllerforDashboardDeleteComponent
} from "./dashboardTemplateController/controllerfor-dashboard-delete/controllerfor-dashboard-delete.component";
import {
  AddDiagramsTemplateToDashboardComponent
} from "./dashboardTemplateController/add-diagrams-template-to-dashboard/add-diagrams-template-to-dashboard.component";
import {
  ControllerforDashboardCreationComponent
} from "./dashboardTemplateController/controllerfor-dashboard-creation/controllerfor-dashboard-creation.component";
import {DataGraphService} from "../../../service/data-graph.service";
import {DashboardName} from "../../../models/dashboard-name";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit{

  alltableDatas: DashboardName[] = [];
  warning = '';
  errorMessage = '';
  titleDashboard = '';
  iddashboard!: number;
  formDashboard!: FormGroup;
  valueToUpdate = '';
  specificDashboard: string = '';



  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder, private  service: DataGraphService) {
  }


  ngOnInit() {
    this.formDashboard = this.fb.group({
      dashboard: [''],
    });

    this.getDashboardValue();

  }


  onSubmit(valueToUpdate: string) {
    this.valueToUpdate = valueToUpdate;
    if (this.valueToUpdate === 'Dashboard erstellen') {
      this.errorMessage = '';
      this.dialog.open(ControllerforDashboardCreationComponent, {
        width: '600px',


      });
    } else if (this.valueToUpdate === 'Dashboard löschen') {
      this.errorMessage = '';
      this.dialog.open(ControllerforDashboardDeleteComponent, {
        width: '500px',
        data: {iddashboard: this.iddashboard, titleDashboard: this.titleDashboard}
      });
    } else if (this.valueToUpdate === 'Diagramm laden') {
      this.errorMessage = '';
      this.dialog.open(AddDiagramsTemplateToDashboardComponent, {
        width: '700px', height: '2000px',
        data: {dashboardName: this.specificDashboard}
      });
    } else {
      this.errorMessage = 'wir konnte leider nicht Ihre ausgewählte Operation finden'
    }
  }


  getDashboardValue() {
    this.service.getAllDashboardName().subscribe({
      next: (data) => {
        console.log(data)
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



  successMessage() {
    this.snackBar.open('Der Dashboard wurde erfolgreich erstellt', 'Danke', {
      duration: 5000,
    })
  }
}
