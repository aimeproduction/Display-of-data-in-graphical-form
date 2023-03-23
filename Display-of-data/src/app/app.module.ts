import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QueriesComponent} from "./components/pages/queries/queries.component";
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DefaultComponent } from './components/shared/default/default.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import { DiagramsComponent } from './components/pages/diagrams/diagrams.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { DocumentationComponent } from './components/others/documentation/documentation.component';
import { ContactsComponent } from './components/others/contacts/contacts.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatTreeModule} from "@angular/material/tree";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { DiagramConfigurationforUpdateComponent } from './components/pages/diagrams/diagram-template-update/diagram-configurationfor-update/diagram-configurationfor-update.component';
import { DiagramConfigurationforDeleteComponent } from './components/pages/diagrams/diagram-template-update/diagram-configurationfor-delete/diagram-configurationfor-delete.component';
import { SelectedLineConfigurationforUpdateComponent } from './components/pages/diagrams/selected-line-template-update/selected-line-configurationfor-update/selected-line-configurationfor-update.component';
import { SelectedLineConfigurationforDeleteComponent } from './components/pages/diagrams/selected-line-template-update/selected-line-configurationfor-delete/selected-line-configurationfor-delete.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import { DiagramConfigurationforNewLineComponent } from './components/pages/diagrams/diagram-template-update/diagram-configurationfor-new-line/diagram-configurationfor-new-line.component';

@NgModule({
  declarations: [
    AppComponent,
    QueriesComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DefaultComponent,
    DiagramsComponent,
    DashboardComponent,
    DocumentationComponent,
    ContactsComponent,
    DiagramConfigurationforUpdateComponent,
    DiagramConfigurationforDeleteComponent,
    SelectedLineConfigurationforUpdateComponent,
    SelectedLineConfigurationforDeleteComponent,
    DiagramConfigurationforNewLineComponent
  ],

    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatTreeModule,
        MatOptionModule,
        MatSelectModule,
        HttpClientModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
