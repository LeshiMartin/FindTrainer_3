import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent {
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  fileToUpload: File;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  imageExists: boolean = false;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.imageExists = true;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    //convert for upload
    const fileBeforeCrop = this.imageChangedEvent.target.files[0];
    this.fileToUpload = new File([event.base64], fileBeforeCrop.name, {
      type: fileBeforeCrop.type,
    });
  }

  constructor(
    private _userService: UserService,
    private toastR: ToastrService
  ) {}
  done() {
    //Upload my image to cloudinary
    const file_data = this.fileToUpload;
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'codexmaker');
    this._userService.uploadImage(data).subscribe((response) => {
      if (response) {
        console.log(response.url);
      }
    });
  }
  reset() {
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.imageExists = false;
    this.myInputVariable.nativeElement.value = '';
  }
  loadImageFailed() {
    this.toastR.error('Wrong file type, please use a valid image');
  }
}
