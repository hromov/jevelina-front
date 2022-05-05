import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferChipComponent } from './transfer-chip.component';

describe('TransferChipComponent', () => {
  let component: TransferChipComponent;
  let fixture: ComponentFixture<TransferChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
