import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionTemplateComponent } from './description-template.component';

describe('DescriptionTemplateComponent', () => {
  let component: DescriptionTemplateComponent;
  let fixture: ComponentFixture<DescriptionTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionTemplateComponent]
    });
    fixture = TestBed.createComponent(DescriptionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
