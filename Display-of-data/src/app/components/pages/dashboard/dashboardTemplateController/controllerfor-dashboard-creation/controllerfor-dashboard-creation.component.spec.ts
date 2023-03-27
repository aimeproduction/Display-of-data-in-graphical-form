import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerforDashboardCreationComponent } from './controllerfor-dashboard-creation.component';

describe('ControllerforDashboardCreationComponent', () => {
  let component: ControllerforDashboardCreationComponent;
  let fixture: ComponentFixture<ControllerforDashboardCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControllerforDashboardCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControllerforDashboardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
