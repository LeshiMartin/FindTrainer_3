import { Component, OnInit } from '@angular/core';
// import {AllCertificationsDTO} from '../../../_model/_Dto/CertificationDTO';
import { _organization } from 'src/app/_data/_organizations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { AuthService } from 'src/app/_services/auth.service';
import { CertificationService } from 'src/app/_services/certification.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-certifications',
  templateUrl: './dashboard-certifications.component.html',
  styleUrls: ['./dashboard-certifications.component.css'],
})
export class DashboardCertificationsComponent implements OnInit {
  allcertifications: CertificationDTO[] = [];
  certificationForm: FormGroup;
  private TrainerId: string;
  private initData: CertificationDTO = {
    description: 'Description',
    title: 'Title',
    created: new Date(Date.now()),
    expired: new Date(Date.now()),
    trainerId: 'TrainerId',
    organization: _organization[0],
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private AuthS: AuthService,
    private CertificationS: CertificationService
  ) {
    // this.getCertifications();
  }
  getCertifications() {
    this.CertificationS.getCurrentUserCerts().subscribe(
      (res: CertificationDTO[]) => {
        this.allcertifications = res;
      }
    );
  }

  ngOnInit(): void {
    this.certificationForm = this.fb.group({
      description: [this.initData.description, [Validators.required]],
      title: [this.initData.title, [Validators.required]],
      created: [this.initData.created, [Validators.required]],
      expired: [this.initData.expired, [Validators.required]],
      trainerId: [this.initData.trainerId, [Validators.required]],
      organization: [this.initData.organization, [Validators.required]],
    });
  }
  addCertification() {
    const form = this.certificationForm.value;
  }

  organizations = _organization;

  // onSubmit(): void {
  //   const form = this.developerForm.value;

  //   // this.addService
  //   //   .addCertification(form)
  //   //   .then(() => {
  //   //     this.router.navigate([_editCertification_route]);
  //   //   })
  //   //   .catch((error) => {
  //   //     this.toastr.error(error.message);
  //   //   });
  //   this.getAllCertifications();
  // }

  // onDelete(item: CertificationDTO): void {
  //   // this.addService.delete(item);
  //   this.getAllCertifications();
  // }
}
