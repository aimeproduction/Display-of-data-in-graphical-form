import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedLineTemplateUpdateComponent } from './selected-line-template-update.component';

describe('SelectedLineTemplateUpdateComponent', () => {
  let component: SelectedLineTemplateUpdateComponent;
  let fixture: ComponentFixture<SelectedLineTemplateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedLineTemplateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedLineTemplateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
