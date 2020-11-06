import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `<input
    autoSizeInput
    type="text"
  >`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
}
