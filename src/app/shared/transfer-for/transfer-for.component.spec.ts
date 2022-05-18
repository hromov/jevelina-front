import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferForComponent } from './transfer-for.component';

describe('TransferForComponent', () => {
  let component: TransferForComponent;
  let fixture: ComponentFixture<TransferForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
