import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsStepComponent } from './leads-step.component';

describe('LeadsStepComponent', () => {
  let component: LeadsStepComponent;
  let fixture: ComponentFixture<LeadsStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
