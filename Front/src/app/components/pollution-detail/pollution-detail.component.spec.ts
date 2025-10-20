import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollutionDetailComponent } from './pollution-detail.component';

describe('PollutionDetailComponent', () => {
  let component: PollutionDetailComponent;
  let fixture: ComponentFixture<PollutionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollutionDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PollutionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
