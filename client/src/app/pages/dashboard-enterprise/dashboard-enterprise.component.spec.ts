import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEnterpriseComponent } from './dashboard-enterprise.component';

describe('DashboardEnterpriseComponent', () => {
  let component: DashboardEnterpriseComponent;
  let fixture: ComponentFixture<DashboardEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardEnterpriseComponent]
    });
    fixture = TestBed.createComponent(DashboardEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
