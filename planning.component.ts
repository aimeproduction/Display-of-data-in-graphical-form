import {Component, OnInit, ViewChild} from '@angular/core';
import {PlanningFacade} from '@innomes-ui/optimizer/domain';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {Observable} from "rxjs";
import {AssetNode} from "@innomes-ui/asset/api";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TranslationModuleIdentifier} from "@innomes-ui/shared/domain";
import {HttpClient} from "@angular/common/http";
import {Appointment, Service, Task} from "./planning.service";
import {addMinutes, endOfDay, startOfDay, subMinutes} from "date-fns";
import {DxValidatorComponent,} from 'devextreme-angular';

@Component({
  selector: 'optimizer-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
  providers: [Service],
})
export class PlanningComponent extends OnDestroyMixin implements OnInit {
  @ViewChild('targetValidator', {static: false}) public validator!: DxValidatorComponent;
  public draggingGroupName = 'appointmentsGroup';

  public tasks!: Task[];

  public resources: any[] = [
    {id: 1, color: 'red', text: 'MissInTime'},
    {id: 2, color: 'DodgerBlue1', text: 'InTime'},
  ];
  public taskLength!: number;
  public appointments!: Appointment[];
  public orderNumber!: string;
  public now: Date = new Date();
  public currentDate: Date = new Date();
  public startDate!: Date;
  public endDate!: Date;
  public startOfToday = startOfDay(new Date());
  public endOfToday = endOfDay(new Date());
  public startOfCurrentDay = startOfDay(this.currentDate);
  public endOfCurrentDay = endOfDay(this.currentDate);
  public duration!: number;
  public visible!: boolean;
  public showOrderList = false
  public dataSource: any;
  public popUpForm!: FormGroup;
  public translationModuleName = TranslationModuleIdentifier.PlanningGui;
  public headline$: Observable<string>;
  public assetNodes: Partial<AssetNode>[] = [];
  public childrenNodes: Partial<AssetNode>[] = [];

  public parentControl: FormControl = new FormControl<Partial<AssetNode>>({});
  public childrenControl: FormControl = new FormControl<Partial<AssetNode>[]>([])

  constructor(private planningFacade: PlanningFacade, private http: HttpClient, private service: Service, private fb: FormBuilder) {
    super();
    this.headline$ = this.planningFacade.headline$;
    this.tasks = service.getTasks();
    this.taskLength = this.tasks.length
    this.appointments = service.getAppointments();
    this.onAppointmentRemove = this.onAppointmentRemove.bind(this);
    this.onAppointmentAdd = this.onAppointmentAdd.bind(this);

  }


  public ngOnInit() {
    this.planningFacade.assets$.pipe(untilComponentDestroyed(this)).subscribe((assetNodes) => {
      this.assetNodes = assetNodes;
    });

    this.parentControl.valueChanges.pipe(untilComponentDestroyed(this)).subscribe((value) => {
      this.childrenNodes = value.children ?? [];
      this.childrenControl.setValue([]);
    });

    this.childrenControl.valueChanges.pipe(untilComponentDestroyed(this)).subscribe((values) => {
      this.showOrderList = values.length > 0;

      // eslint-disable-next-line no-console
      console.log('Selected Children', values);
    });

    this.popUpForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    })
  }


  public onAppointmentRemove(e: any) {
    const index = this.appointments.indexOf(e.itemData);

    if (index >= 0) {
      this.appointments.splice(index, 1);
      this.tasks.push(e.itemData);
      this.taskLength++;
    }
  }

  public onAppointmentAdd(e: any) {
    this.setCurrentDateHoursAndMins(e);
    const index = this.tasks.indexOf(e.fromData);
    if (index >= 0) {
      this.tasks.splice(index, 1);
      this.appointments.push(e.itemData);
      this.startDate = e.itemData.startDate;
      this.orderNumber = e.itemData.order_number;
      e.itemData.endDate = addMinutes(this.startDate, e.itemData.duration * 60);
      this.endDate = e.itemData.endDate;
      if (e.itemData.planned_time < this.startOfCurrentDay || e.itemData.planned_time > this.endOfCurrentDay
        || this.currentDate < this.startOfToday || e.itemData.startDate < this.currentDate) {
        e.itemData.resourceId = 1;
      } else {
        e.itemData.resourceId = 2;
      }
      this.taskLength--;
    }
  }


  public setCurrentDateHoursAndMins(e: any) {
    if (e.itemData.startDate < endOfDay(new Date()) && e.itemData.startDate > startOfDay(new Date())) {
      this.currentDate = new Date();
    } else if (e.itemData.startDate > this.endOfToday) {
      this.currentDate = new Date(e.itemData.startDate)
      this.currentDate.setHours(0, 0)
      this.startOfCurrentDay = startOfDay(this.currentDate)
      this.endOfCurrentDay = endOfDay(this.currentDate)
    } else {

      const hours = this.currentDate.getHours()
      const minutes = this.currentDate.getMinutes()
      this.currentDate = new Date(e.itemData.startDate)
      this.currentDate.setHours(hours, minutes)
      this.startOfCurrentDay = startOfDay(this.currentDate)
      this.endOfCurrentDay = endOfDay(this.currentDate)
    }
  }

  public onAppointmentUpdating(e: any) {
    this.startOfCurrentDay = startOfDay(e.newData.startDate)
    this.endOfCurrentDay = endOfDay(e.newData.startDate)
    if (e.newData.planned_time < this.startOfCurrentDay || e.newData.planned_time > this.endOfCurrentDay
      || this.currentDate < this.startOfToday || e.newData.startDate < this.currentDate) {
      e.newData.resourceId = 1;
    } else {
      e.newData.resourceId = 2;
    }
  }

  public onListDragStart(e: any) {
    e.cancel = true;
  }

  public onItemDragStart(e: any) {
    e.itemData = e.fromData;
  }

  public onItemDragEnd(e: any) {
    if (e.toData) {
      e.cancel = true;
    }
  }

  public showDialog() {
    this.visible = true;
  }

  public onAppointmentFormOpening(data: any) {
    data.cancel = true;
    this.startDate = data.appointmentData.startDate;
    this.orderNumber = data.appointmentData.order_number;
    this.duration = data.appointmentData.duration;
    this.endDate = data.appointmentData.endDate;
    this.showDialog();
  }

  public handleStartDateChange() {
    this.endDate = addMinutes(this.startDate, this.duration * 60);
  }

  public handleEndDateChange() {
    this.startDate = subMinutes(this.endDate, this.duration * 60);
  }


  public onOptionChanged(data: any) {
    if (data.name === "currentDate") {
      this.currentDate = data.value;
      this.startOfCurrentDay = startOfDay(this.currentDate)
      this.endOfCurrentDay = endOfDay(this.currentDate)
    }
  }

  public setNewTime() {
    const orderToUpdate = 'Auftrag: ' + this.orderNumber
    this.appointments.forEach((x) => {
      if (x.displayText === orderToUpdate) {
        x.startDate = this.startDate;
        x.endDate = this.endDate;
      }
    })
    this.visible = false
  }

}
