import { _collection_certifications } from 'src/app/_data/_collections';
import { GenericsServiceService } from 'src/app/_services/generics-service.service';
import { Component } from '@angular/core';
// import {AllCertificationsDTO} from '../../../_model/_Dto/CertificationDTO';
import { _organization } from 'src/app/_data/_organizations';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { CertificationService } from 'src/app/_services/certification.service';

@Component({
  selector: 'app-dashboard-certifications',
  templateUrl: './dashboard-certifications.component.html',
  styleUrls: ['./dashboard-certifications.component.css'],
})
export class DashboardCertificationsComponent {
  allcertifications: CertificationDTO[] = [];
  constructor(private CertificationS: CertificationService) {
    this.getCertifications();
  }
  getCertifications(): void {
    this.CertificationS.getCurrentTrainerCerts()
      .subscribe((res: any) => {
        const data: CertificationDTO[] = res;
        this.allcertifications = data;
      })
      .unsubscribe();
  }

  ChangeItems(): void {
    this.getCertifications();
  }
}
