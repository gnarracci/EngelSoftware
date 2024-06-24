import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupEnterpriseComponent } from './setup-enterprise.component';

describe('SetupEnterpriseComponent', () => {
  let component: SetupEnterpriseComponent;
  let fixture: ComponentFixture<SetupEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SetupEnterpriseComponent]
    });
    fixture = TestBed.createComponent(SetupEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
