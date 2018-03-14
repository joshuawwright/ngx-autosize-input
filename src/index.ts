import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutoSizeInputDirective } from './auto-size-input.directive';
export * from './auto-size-input.directive';

@NgModule({
  imports: [
      CommonModule
  ],
  declarations: [
      AutoSizeInputDirective,
  ],
  exports: [
      AutoSizeInputDirective,
  ]
})
export class AutoSizeInputModule {}
