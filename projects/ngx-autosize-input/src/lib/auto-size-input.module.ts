import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoSizeInputDirective } from './auto-size-input.directive';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		AutoSizeInputDirective,
	],
	exports: [
		AutoSizeInputDirective,
	],
	providers: [
		{ provide: Window, useValue: window },
	],
})
export class AutoSizeInputModule {}
