import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCertificationsComponent } from './dashboard-certifications.component';

describe('DashboardCertificationsComponent', () => {
  let component: DashboardCertificationsComponent;
  let fixture: ComponentFixture<DashboardCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCertificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
