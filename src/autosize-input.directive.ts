/**
 * Created by Joshua Wright on 11/2/2017
 */
import { ElementRef, HostListener, Directive, AfterContentChecked } from '@angular/core';

@Directive({
    selector: '[appAutoSizeInput]',
})
export class AutoSizeInputDirective implements AfterContentChecked {

    @HostListener('input', ['$event.target'])
    onInput(): void {
        this.adjustWidth();
    }

    constructor(public element: ElementRef) {
    }

    ngAfterContentChecked(): void {
        this.adjustWidth();
    }

    adjustWidth(): void {
        const style = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size');
        const fontFamily = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family');
        const fontSize = parseFloat(style);
        this.element.nativeElement.style.width = this.getTextWidth(this.element.nativeElement.value, fontSize, fontFamily)
            + this.getTextWidth('____', fontSize, fontFamily) + 'px';
    }

    getTextWidth(value: string, fontSize: any, fontFamily: string) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx!.font = `${fontSize}px ${fontFamily}`;
        return ctx!.measureText(value).width;
    }

}
