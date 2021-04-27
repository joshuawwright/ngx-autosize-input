import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-root',
	template: `
    <div>
      <h2>ngx-autosize-input demo</h2>
    </div>
    <label>
      Enter and remove text in the input box below:
    </label>
    <br>
    <input
      autoSizeInput
      [(ngModel)]="name"
      type="text"
    >
    <br>
    <br>
    <label>
      Enter and remove text in the input with a placeholder below
    </label>
    <br>
    <input
      autoSizeInput
      placeholder="Input size should never be smaller then this string"
      [(ngModel)]="withPlaceholder"
      type="text"
    >
    <br>
    <br>
    <label>
      Input below should fit to placeholder only when it's visible, otherwise fit to text entered by user
    </label>
    <br>
    <input
      autoSizeInput
      placeholder="Should fit to whatever text is displayed"
      [usePlaceHolderWhenEmpty]="true"
      [(ngModel)]="placeHolderWhenEmpty"
      type="text"
    >
    <br>
    <br>
    <fieldset [formGroup]="form">
      <label>
        Input below should fit to placeholder only when it's visible, otherwise fit to text entered by user
      </label>
      <br>
      <input
        autoSizeInput
        placeholder="This input is using a form control name"
        [usePlaceHolderWhenEmpty]="true"
        formControlName="inputWithControlName"
        type="text"
      >
    </fieldset>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  name: string;
  withPlaceholder: string;
  placeHolderWhenEmpty: string;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      inputWithControlName: new FormControl('')
    });
  }
}
