import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallationsComponent } from './installations.component';

describe('InstallationsComponent', () => {
  let component: InstallationsComponent;
  let fixture: ComponentFixture<InstallationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstallationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
