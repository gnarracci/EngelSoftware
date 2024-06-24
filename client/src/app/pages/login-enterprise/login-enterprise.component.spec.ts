import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEnterpriseComponent } from './login-enterprise.component';

describe('LoginEnterpriseComponent', () => {
  let component: LoginEnterpriseComponent;
  let fixture: ComponentFixture<LoginEnterpriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginEnterpriseComponent]
    });
    fixture = TestBed.createComponent(LoginEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
