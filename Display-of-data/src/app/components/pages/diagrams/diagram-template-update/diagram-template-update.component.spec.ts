import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramTemplateUpdateComponent } from './diagram-template-update.component';

describe('DiagramTemplateUpdateComponent', () => {
  let component: DiagramTemplateUpdateComponent;
  let fixture: ComponentFixture<DiagramTemplateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramTemplateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramTemplateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
