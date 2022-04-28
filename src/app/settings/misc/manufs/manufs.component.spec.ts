import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufsComponent } from './manufs.component';

describe('ManufsComponent', () => {
  let component: ManufsComponent;
  let fixture: ComponentFixture<ManufsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
