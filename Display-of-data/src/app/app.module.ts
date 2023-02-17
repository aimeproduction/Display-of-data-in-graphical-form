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
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
