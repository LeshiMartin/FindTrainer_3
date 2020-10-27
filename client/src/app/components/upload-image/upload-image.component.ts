import { Component, ElementRef, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

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
  reset() {
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.imageExists = false;
    this.myInputVariable.nativeElement.value = '';
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
