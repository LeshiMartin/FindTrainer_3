import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { _collection_certifications } from 'src/app/_data/_collections';
import { _organization } from 'src/app/_data/_organizations';
import { CertificationDTO } from 'src/app/_model/_Dto/CertificationDTO';
import { CertificationService } from 'src/app/_services/certification.service';
import { GenericsServiceService } from 'src/app/_services/generics-service.service';

@Component({
  selector: 'app-add-update-certifications',
  templateUrl: './add-update-certifications.component.html',
  styleUrls: ['./add-update-certifications.component.css'],
})
export class AddUpdateCertificationsComponent {
  @Input() existedData: CertificationDTO = new CertificationDTO();
  @Input() isAdd: boolean = true;
  @Input() trainerId: string = '';

  certificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private CertificationS: CertificationService,
    private GS: GenericsServiceService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  ngOnChange(): void {
    if (this.existedData) {
      this.initForm();
    }
  }
  private initForm() {
    this.certificationForm = this.fb.group({
      title: [this.existedData.title, [Validators.required]],
      created: [this.existedData.created, [Validators.required]],
      expired: [
        this.existedData.expired,
        this.existedData.neverExpire ? [] : [Validators.required],
      ],
      organization: [this.existedData.organization, [Validators.required]],
      neverExpire: [this.existedData.neverExpire, [Validators.required]],
    });
  }
  addCertification() {
    console.log('this.trainerId', this.trainerId);
    console.log('this.certificationForm.value', this.certificationForm.value);
    console.log(
      '{ trainerId: this.trainerId, ...this.certificationForm.value }',
      { trainerId: this.trainerId, ...this.certificationForm.value }
    );
    this.GS.addDoc(
      { trainerId: this.trainerId, ...this.certificationForm.value },
      _collection_certifications
    )
      .then(() => {
        this.toastr.info('Certification is added');
      })
      .catch((err) => {
        this.toastr.error(err);
      });
  }
  editCertification() {
    console.log('this.certificationForm.value', this.certificationForm.value);
  }
  FormatDate(time: Date) {
    return time.getFullYear() + '-' + time.getMonth() + '-' + time.getDay();
  }
}
