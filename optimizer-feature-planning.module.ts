import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OptimizerDomainModule} from '@innomes-ui/optimizer/domain';
import {PlanningComponent} from './planning.component';
import {PageModule} from "@atr/common";
import {CardModule} from "primeng/card";
import {
  DxButtonModule,
  DxCheckBoxModule,
  DxDateBoxModule,
  DxDraggableModule,
  DxPopupModule,
  DxSchedulerModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTagBoxModule,
  DxTextBoxModule,
  DxValidatorModule
} from "devextreme-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {CalendarModule} from "primeng/calendar";
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";


@NgModule({
  imports: [
    CommonModule
    , OptimizerDomainModule, PageModule, CardModule, DxSelectBoxModule, DxTagBoxModule, ReactiveFormsModule, TranslateModule, DxSchedulerModule, DxScrollViewModule, DxDraggableModule, DxCheckBoxModule, DxPopupModule, ButtonModule, DialogModule, DxTextBoxModule, DxDateBoxModule, DxButtonModule, DxValidatorModule, InputTextModule, FormsModule, CalendarModule, RippleModule, MessageModule]
  , declarations: [PlanningComponent], exports: [PlanningComponent]
})
export class OptimizerFeaturePlanningModule {
}
