import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationConfigComponent } from './installation-config.component';

describe('InstallationConfigComponent', () => {
  let component: InstallationConfigComponent;
  let fixture: ComponentFixture<InstallationConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstallationConfigComponent]
    });
    fixture = TestBed.createComponent(InstallationConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
