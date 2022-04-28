import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTypesDialogComponent } from './task-types-dialog.component';

describe('TaskTypesDialogComponent', () => {
  let component: TaskTypesDialogComponent;
  let fixture: ComponentFixture<TaskTypesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskTypesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
