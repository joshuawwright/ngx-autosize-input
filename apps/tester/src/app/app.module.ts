import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoSizeInputDirective } from 'ngx-autosize-input';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AutoSizeInputDirective,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
