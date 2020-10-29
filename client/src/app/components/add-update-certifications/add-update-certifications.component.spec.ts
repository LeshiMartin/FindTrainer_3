import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateCertificationsComponent } from './add-update-certifications.component';

describe('AddUpdateCertificationsComponent', () => {
  let component: AddUpdateCertificationsComponent;
  let fixture: ComponentFixture<AddUpdateCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateCertificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUpdateCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
