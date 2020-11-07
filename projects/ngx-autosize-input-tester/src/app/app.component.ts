import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `<input
    autoSizeInput
    [(ngModel)]="name"
    type="text"
  >`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	name = 'test23423';
}
