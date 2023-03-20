import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramConfigurationforDeleteComponent } from './diagram-configurationfor-delete.component';

describe('DiagramConfigurationforDeleteComponent', () => {
  let component: DiagramConfigurationforDeleteComponent;
  let fixture: ComponentFixture<DiagramConfigurationforDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagramConfigurationforDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagramConfigurationforDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
