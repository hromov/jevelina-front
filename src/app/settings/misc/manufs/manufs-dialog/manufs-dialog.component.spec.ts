import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufsDialogComponent } from './manufs-dialog.component';

describe('ManufsDialogComponent', () => {
  let component: ManufsDialogComponent;
  let fixture: ComponentFixture<ManufsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManufsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
