import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprovemoneyComponent } from './aprovemoney.component';

describe('AprovemoneyComponent', () => {
  let component: AprovemoneyComponent;
  let fixture: ComponentFixture<AprovemoneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprovemoneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AprovemoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
