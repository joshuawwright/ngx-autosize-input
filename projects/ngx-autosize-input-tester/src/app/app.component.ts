import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `<input [(ngModel)]="name" type="text" autoSizeInput>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
	name='test23423'
}
