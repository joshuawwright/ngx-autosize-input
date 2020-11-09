import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AUTO_SIZE_INPUT_OPTIONS, AutoSizeInputModule, AutoSizeInputOptions } from 'ngx-autosize-input';

import { AppComponent } from './app.component';

const CUSTOM_AUTO_SIZE_INPUT_OPTIONS: AutoSizeInputOptions = {
	extraWidth: 0,
	includeBorders: false,
	includePadding: true,
	includePlaceholder: true,
	maxWidth: -1,
	minWidth: -1,
	setParentWidth: false,
}

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AutoSizeInputModule,
		FormsModule,
	],
	providers: [
		{ provide: AUTO_SIZE_INPUT_OPTIONS, useValue: CUSTOM_AUTO_SIZE_INPUT_OPTIONS }
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
