import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramConfigurationforNewLineComponent } from './diagram-configurationfor-new-line.component';

describe('DiagramConfigurationforNewLineComponent', () => {
  let component: DiagramConfigurationforNewLineComponent;
  let fixture: ComponentFixture<DiagramConfigurationforNewLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramConfigurationforNewLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramConfigurationforNewLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
