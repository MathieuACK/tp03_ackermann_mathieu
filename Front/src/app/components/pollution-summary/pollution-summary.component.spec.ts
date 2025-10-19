import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionSummaryComponent } from './pollution-summary.component';

describe('PollutionSummaryComponent', () => {
  let component: PollutionSummaryComponent;
  let fixture: ComponentFixture<PollutionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PollutionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
