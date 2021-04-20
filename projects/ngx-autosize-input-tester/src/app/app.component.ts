import { ChangeDetectionStrategy, Component } from '@angular/core';

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
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  name: string;
  withPlaceholder: string;
  placeHolderWhenEmpty: string;
}
