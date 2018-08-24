/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AutoSizeInputModule } from '../src/index';


@Component({
  selector: 'app-playground',
  template: `<input type="text" AutoSizeInput>`
})
class AppComponent {}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [ AppComponent ],
  imports: [ BrowserModule, AutoSizeInputModule ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
