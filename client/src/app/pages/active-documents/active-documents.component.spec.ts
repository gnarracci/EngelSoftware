import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDocumentsComponent } from './active-documents.component';

describe('ActiveDocumentsComponent', () => {
  let component: ActiveDocumentsComponent;
  let fixture: ComponentFixture<ActiveDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveDocumentsComponent]
    });
    fixture = TestBed.createComponent(ActiveDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
