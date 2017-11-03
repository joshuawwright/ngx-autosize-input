/**
 * Created by Joshua Wright on 11/3/2017
 */
import { NgModule } from '@angular/core';
import { AutoSizeInputDirective } from './autosize-input.directive';
export var autoSizeInputModule = (function () {
    function autoSizeInputModule() {
    }
    autoSizeInputModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AutoSizeInputDirective
                    ],
                    exports: [
                        AutoSizeInputDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    autoSizeInputModule.ctorParameters = function () { return []; };
    return autoSizeInputModule;
}());
//# sourceMappingURL=autoSizeInput.module.js.map