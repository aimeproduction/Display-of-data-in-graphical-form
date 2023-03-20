import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLineConfigurationforUpdateComponent } from './selected-line-configurationfor-update.component';

describe('SelectedLineConfigurationforUpdateComponent', () => {
  let component: SelectedLineConfigurationforUpdateComponent;
  let fixture: ComponentFixture<SelectedLineConfigurationforUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedLineConfigurationforUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedLineConfigurationforUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
