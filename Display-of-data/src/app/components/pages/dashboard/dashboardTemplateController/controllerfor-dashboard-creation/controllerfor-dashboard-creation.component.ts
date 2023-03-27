import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DataGraphService} from "../../../../../service/data-graph.service";

@Component({
  selector: 'app-controllerfor-dashboard-creation',
  templateUrl: './controllerfor-dashboard-creation.component.html',
  styleUrls: ['./controllerfor-dashboard-creation.component.css']
})
export class ControllerforDashboardCreationComponent implements OnInit{
  errorMessage = '';
  form!: FormGroup;


  constructor(public _snackBar: MatSnackBar, public dialogRef: MatDialogRef<ControllerforDashboardCreationComponent>,
               private fb: FormBuilder, public dialog: MatDialog, private service: DataGraphService) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
    });

  }



  onSubmit(title: string) {
    this.form.value.title = title;
    this.service.postDashboardName(this.form.value).subscribe({
      next: () => {
        this.successMessage()
        this.form.reset();
        this.errorMessage = '';
        this.ClickClose()
      },

      error: () => {
        this.errorMessage = 'Ihr Titel konnte leider nicht gespeichert werden. Bitte prüfen Sie die Verbindung und versuchen Sie noch einmal.'
      },
      complete: () => {

      }
    })

  }



  ClickClose(): void {
    this.dialogRef.close();
  }


  successMessage() {
    this._snackBar.open('Der Dashboard wurde erfolgreich erstellt', 'Danke', {
      duration: 5000,
    })
  }
}
