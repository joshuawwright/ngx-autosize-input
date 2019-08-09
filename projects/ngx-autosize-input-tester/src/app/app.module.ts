import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutoSizeInputModule } from 'ngx-autosize-input';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AutoSizeInputModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
