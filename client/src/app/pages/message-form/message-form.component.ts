import { UserService } from 'src/app/_services/user.service';
import { _collection_messages } from './../../_data/_collections';
import { GenericsServiceService } from '../../_services/generics-service.service';
import { MessageDTO } from '../../_model/_Dto/MessageDTO';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css'],
})
export class MessageFormComponent implements OnInit {
  private errorMessage =
    'Sorry! We are unable to send this message at this time, please try again later.';
  private successMessage = 'Thank you for your message!';

  messageForm: FormGroup;
  initData: MessageDTO = new MessageDTO();

  constructor(
    private AS: AuthService,
    private GS: GenericsServiceService,
    private US: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}
  readonly emailOnly = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  ngOnInit(): void {
    this.initForm();
  }
  private initForm(): void {
    const { name, message, email, phoneNumber, title } = this.initData;
    this.messageForm = this.fb.group({
      name: [name, [Validators.required]],
      title: [
        title,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      message: [
        message,
        [
          Validators.required,
          Validators.maxLength(300),
          Validators.minLength(6),
        ],
      ],
      email: [email, [Validators.pattern(this.emailOnly), Validators.required]],
      phoneNumber: [phoneNumber, [Validators.required]],
    });
  }

  submitFunc() {
    this.US.currentBrowseTrainer$
      .subscribe(
        (res) => {
          if (!res) {
            return;
          }
          console.log('res', res);
          const data = {
            ...this.initData,
            ...this.messageForm.value,
            trainerId: res,
          };
          console.log('data', data);
          this.GS.addDoc(data, _collection_messages)
            .then(() => {
              this.toastr.success(this.successMessage);
              this.initData = new MessageDTO();
              this.initForm();
            })
            .catch((err) => {
              console.log('err', err);
              this.toastr.error(this.errorMessage);
            });
        },
        (err) => this.toastr.error(this.errorMessage)
      )
      .unsubscribe();
  }
}
