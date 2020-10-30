import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
})
export class NotfoundComponent {
  @Input() type: string = 'page';
}
