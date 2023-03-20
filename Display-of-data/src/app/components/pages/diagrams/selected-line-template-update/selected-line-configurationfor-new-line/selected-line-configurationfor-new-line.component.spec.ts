import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLineConfigurationforNewLineComponent } from './selected-line-configurationfor-new-line.component';

describe('SelectedLineConfigurationforNewLineComponent', () => {
  let component: SelectedLineConfigurationforNewLineComponent;
  let fixture: ComponentFixture<SelectedLineConfigurationforNewLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedLineConfigurationforNewLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedLineConfigurationforNewLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
