import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `<input
    autoSizeInput
    [style.padding.px]="0"
    type="text"
  >`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
