import { Component } from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent {

  sideBarOpen = true;


  /*
  Shows or hides the Sidebar based on the current state.
   */
  sideBarToggler($event: any) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
