import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLineConfigurationforDeleteComponent } from './selected-line-configurationfor-delete.component';

describe('SelectedLineConfigurationforDeleteComponent', () => {
  let component: SelectedLineConfigurationforDeleteComponent;
  let fixture: ComponentFixture<SelectedLineConfigurationforDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedLineConfigurationforDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedLineConfigurationforDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
