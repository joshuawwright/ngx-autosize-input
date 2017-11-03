import { ElementRef, HostListener, Directive, Input } from '@angular/core';
export var AutoSizeInputDirective = (function () {
    function AutoSizeInputDirective(element) {
        this.element = element;
        this.extraWidth = 4;
    }
    AutoSizeInputDirective.prototype.onInput = function () {
        this.adjustWidth();
    };
    AutoSizeInputDirective.prototype.ngAfterContentChecked = function () {
        this.adjustWidth();
    };
    AutoSizeInputDirective.prototype.adjustWidth = function () {
        var style = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size');
        var fontFamily = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family');
        var fontSize = parseFloat(style);
        var extraWidthCalculated = this.getTextWidth('_', fontSize, fontFamily) * this.extraWidth;
        this.element.nativeElement.style.width = this.getTextWidth(this.element.nativeElement.value, fontSize, fontFamily)
            + extraWidthCalculated + 'px';
    };
    AutoSizeInputDirective.prototype.getTextWidth = function (value, fontSize, fontFamily) {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.font = fontSize + "px " + fontFamily;
        return ctx.measureText(value).width;
    };
    AutoSizeInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[appAutoSizeInput]',
                },] },
    ];
    /** @nocollapse */
    AutoSizeInputDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AutoSizeInputDirective.propDecorators = {
        'extraWidth': [{ type: Input },],
        'onInput': [{ type: HostListener, args: ['input', ['$event.target'],] },],
    };
    return AutoSizeInputDirective;
}());
//# sourceMappingURL=autosize-input.directive.js.map