/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AutoSizeInputModule } from '../src';


@Component({
  selector: 'app',
  template: `<input type="text" AutoSizeInput style="font-weight: bold">`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AutoSizeInputModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
