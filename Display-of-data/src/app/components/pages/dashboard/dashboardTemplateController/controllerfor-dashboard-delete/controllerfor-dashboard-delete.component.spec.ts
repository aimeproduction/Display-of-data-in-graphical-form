import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerforDashboardDeleteComponent } from './controllerfor-dashboard-delete.component';

describe('ControllerforDashboardDeleteComponent', () => {
  let component: ControllerforDashboardDeleteComponent;
  let fixture: ComponentFixture<ControllerforDashboardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerforDashboardDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerforDashboardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
