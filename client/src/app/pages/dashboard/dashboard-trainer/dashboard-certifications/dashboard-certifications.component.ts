import { Component } from '@angular/core';
// import {AllCertificationsDTO} from '../../../_model/_Dto/CertificationDTO';
import { _organization } from 'src/app/_data/_organizations';
import { FormBuilder } from '@angular/forms';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { CertificationService } from 'src/app/_services/certification.service';
import { GenericsServiceService } from 'src/app/_services/generics-service.service';

@Component({
  selector: 'app-dashboard-certifications',
  templateUrl: './dashboard-certifications.component.html',
  styleUrls: ['./dashboard-certifications.component.css'],
})
export class DashboardCertificationsComponent {
  allcertifications: CertificationDTO[] = [];
  trainerId: string;
  constructor(private CertificationS: CertificationService) {
    this.getCertifications();
  }
  getCertifications() {
    this.CertificationS.getCurrentUserCerts().subscribe((res: any) => {
      const data: CertificationDTO[] = res.data;
      const { trainerId } = res;
      console.log('trainerId', trainerId);
      this.trainerId = trainerId;
      this.allcertifications = data;
    });
  }

  organizations = _organization;

  getCertImage(name: string) {
    return _organization.filter((e) => e.name === name);
  }
}
