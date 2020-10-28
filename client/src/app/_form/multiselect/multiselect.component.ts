import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
})
export class MultiselectComponent implements OnInit {
  myForm: FormGroup;
  @Input() dataArr: string[];
  @Input() existedArr: string[];
  @Input() label: string;
  @Input() limit: number;
  @Output() selectFunction = new EventEmitter();
  @Output() deselectFunction = new EventEmitter();

  allData: any[] = [];
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  selectedItems: any[] = [];
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 4,
    allowSearchFilter: true,
    limitSelection: null,
  };

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.allData = this.transformData(this.dataArr);
    this.dropdownSettings.limitSelection = this.limit;

    this.myForm = this.fb.group({
      [this.label]: [...this.transformData(this.existedArr)],
    });
  }

  onItemSelect(items: any) {
    this.selectFunction.emit(items['item_text']);
  }
  onItemDeSelect(items: any) {
    this.deselectFunction.emit(items['item_text']);
  }
  transformData(arr: string[]) {
    return arr.map((e, i) => {
      return {
        item_id: i,
        item_text: e,
      };
    });
  }
}
