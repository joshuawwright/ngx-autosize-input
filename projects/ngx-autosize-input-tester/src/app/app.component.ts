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
      [style.width]="'100%'"
      autoSizeInput
      [(ngModel)]="name"
      type="text"
    >
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	name: string;
}
