import {Component} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'ngx-autosize-input-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = ''
  letterSpacing = ''
  withPlaceholder = ''
  placeHolderWhenEmpty = ''
  form = new UntypedFormGroup({
    inputWithControlName: new UntypedFormControl('')
  });
}
