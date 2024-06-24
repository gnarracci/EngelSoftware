import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticalDocumentsComponent } from './statical-documents.component';

describe('StaticalDocumentsComponent', () => {
  let component: StaticalDocumentsComponent;
  let fixture: ComponentFixture<StaticalDocumentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaticalDocumentsComponent]
    });
    fixture = TestBed.createComponent(StaticalDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
