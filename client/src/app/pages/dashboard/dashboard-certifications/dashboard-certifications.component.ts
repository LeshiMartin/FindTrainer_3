import { Component, OnInit } from '@angular/core';
import {
  AddCertificationDTO,
  AllCertificationsDTO,
} from '../../../_model/_Dto/CertificationDTO';
// import {AllCertificationsDTO} from '../../../_model/_Dto/CertificationDTO';
import { _organization } from 'src/app/_data/_organizations';
import {
  _dashboardHome_route,
  _editCertification_route,
} from '../../../_data/_route';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-certifications',
  templateUrl: './dashboard-certifications.component.html',
  styleUrls: ['./dashboard-certifications.component.css'],
})
export class DashboardCertificationsComponent implements OnInit {
  allcertifications: AllCertificationsDTO[] = [];
  developerForm: FormGroup;
  initData: AddCertificationDTO = {
    description: 'Description',
    title: 'Title',
    created: new Date(Date.now()),
    expired: new Date(Date.now()),
    trainerId: 'TrainerId',
    organization: _organization[0],
  };

  constructor(
    // private addService: AddService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.getAllCertifications();
  }

  private getAllCertifications() {
    // this.addService
    //   .getAll()
    //   .stateChanges()
    //   .subscribe((res) => {
    //     this.allcertifications = res.map((data: any) => {
    //       const doc = data.payload.doc;
    //       const certificationData: AllCertificationsDTO = doc.data();
    //       //First & End
    //       return certificationData;
    //     });
    //   });
  }

  ngOnInit(): void {
    this.developerForm = this.fb.group({
      description: [this.initData.description, [Validators.required]],
      title: [this.initData.title, [Validators.required]],
      created: [this.initData.created, [Validators.required]],
      expired: [this.initData.expired, [Validators.required]],
      trainerId: [this.initData.trainerId, [Validators.required]],
      organization: [this.initData.organization, [Validators.required]],
    });
  }

  organizations = _organization;

  onSubmit(): void {
    const form = this.developerForm.value;

    // this.addService
    //   .addCertification(form)
    //   .then(() => {
    //     this.router.navigate([_editCertification_route]);
    //   })
    //   .catch((error) => {
    //     this.toastr.error(error.message);
    //   });
    this.getAllCertifications();
  }

  onDelete(item: AllCertificationsDTO): void {
    // this.addService.delete(item);
    this.getAllCertifications();
  }
}
