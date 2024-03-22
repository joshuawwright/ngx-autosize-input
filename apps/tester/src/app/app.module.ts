import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AutoSizeInputModule, CdkInputAutosize} from 'ngx-autosize-input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AutoSizeInputModule,
        FormsModule,
        ReactiveFormsModule,
        CdkInputAutosize,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
