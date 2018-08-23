/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AutoSizeInputModule } from '../src/index';


@Component({
  selector: 'app',
  template: `Test <input type="text" AutoSizeInput>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AutoSizeInputModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
