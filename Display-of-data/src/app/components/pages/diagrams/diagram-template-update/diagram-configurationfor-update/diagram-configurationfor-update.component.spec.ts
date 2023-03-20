import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramConfigurationforUpdateComponent } from './diagram-configurationfor-update.component';

describe('DiagramConfigurationforUpdateComponent', () => {
  let component: DiagramConfigurationforUpdateComponent;
  let fixture: ComponentFixture<DiagramConfigurationforUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramConfigurationforUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramConfigurationforUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
