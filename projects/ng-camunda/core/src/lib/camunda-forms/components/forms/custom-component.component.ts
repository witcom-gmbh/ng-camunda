import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormioCustomComponent } from '@formio/angular';

@Component({
  selector: 'lib-custom-component',
  templateUrl: './custom-component.component.html',
  styleUrls: ['./custom-component.component.css']
})
export class CustomComponentComponent implements FormioCustomComponent<number> {

  @Input()
  value: number;

  @Output()
  valueChange = new EventEmitter<number>();

  @Input()
  disabled: boolean;
  formioEvent?: import("@angular/core").EventEmitter<import("@formio/angular").FormioEvent>;

  constructor() { }

  ngOnInit(): void {
  }

  updateValue(payload: number) {
    this.value = payload; // Should be updated first
    this.valueChange.emit(payload); // Should be called after this.value update
  }

}
