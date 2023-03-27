import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiagramsTemplateToDashboardComponent } from './add-diagrams-template-to-dashboard.component';

describe('AddDiagramsTemplateToDashboardComponent', () => {
  let component: AddDiagramsTemplateToDashboardComponent;
  let fixture: ComponentFixture<AddDiagramsTemplateToDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiagramsTemplateToDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiagramsTemplateToDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
