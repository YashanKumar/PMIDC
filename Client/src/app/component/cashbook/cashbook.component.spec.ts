import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookComponent } from './cashbook.component';

describe('CashbookComponent', () => {
  let component: CashbookComponent;
  let fixture: ComponentFixture<CashbookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashbookComponent]
    });
    fixture = TestBed.createComponent(CashbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
