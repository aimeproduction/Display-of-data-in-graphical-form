import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {QueriesComponent} from "./components/pages/queries/queries.component";
import {DefaultComponent} from "./components/shared/default/default.component";
import {DiagramsComponent} from "./components/pages/diagrams/diagrams.component";
import {DashboardComponent} from "./components/pages/dashboard/dashboard.component";
import {DocumentationComponent} from "./components/others/documentation/documentation.component";
import {ContactsComponent} from "./components/others/contacts/contacts.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'queries',
    pathMatch: 'full'
  },
   {
    path: 'queries',
    component: QueriesComponent
  },
    {
      path: 'diagrams',
      component: DiagramsComponent
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'documentation',
      component: DocumentationComponent
    },
    {
      path: 'contacts',
      component: ContactsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
