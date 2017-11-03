/**
 * Created by Joshua Wright on 11/3/2017
 */

import { NgModule } from '@angular/core';

import {AutoSizeInputDirective} from './autosize-input.directive';

@NgModule({
    declarations: [
        AutoSizeInputDirective
    ],
    exports: [
        AutoSizeInputDirective
    ]
})
export class autoSizeInputModule {}