import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinLeadComponent } from './fin-lead.component';

describe('FinLeadComponent', () => {
  let component: FinLeadComponent;
  let fixture: ComponentFixture<FinLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
