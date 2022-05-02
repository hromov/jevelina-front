import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskColComponent } from './task-col.component';

describe('TaskColComponent', () => {
  let component: TaskColComponent;
  let fixture: ComponentFixture<TaskColComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskColComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
