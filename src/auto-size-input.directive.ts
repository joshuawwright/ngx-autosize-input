import { ElementRef, HostListener, Directive, AfterContentChecked, Input } from '@angular/core';

@Directive({
    selector: '[AutoSizeInput]',
})
export class AutoSizeInputDirective implements AfterContentChecked {

    @Input() extraWidth = 0;
    @Input() includePlaceholder = true;
    @Input() includeBorders = true;
    @Input() includePadding = true;
    @Input() minWidth = -1;
    @Input() maxWidth = -1;

    borderWidth: number;
    paddingWidth: number;

    @HostListener('input', ['$event.target'])
    public onInput(event: any): void {
        this.adjustWidth();
    }

    constructor(public element: ElementRef) {
    }

    ngAfterContentChecked(): void {
        this.adjustWidth();
    }

    adjustWidth(): void {
        if (this.includeBorders) {
            this.borderWidth = 2 * parseInt(window
                .getComputedStyle(this.element.nativeElement, '')
                .getPropertyValue('border'), 10);
        } else {
            this.borderWidth = 0;
        }

        if (this.includePadding) {
            this.paddingWidth = parseInt(window
                    .getComputedStyle(this.element.nativeElement, '')
                    .getPropertyValue('padding-left'), 10) +
                parseInt(window
                    .getComputedStyle(this.element.nativeElement, '')
                    .getPropertyValue('padding-right'), 10);
        } else {
            this.paddingWidth = 0;
        }

        const inputText = this.element.nativeElement.value;
        let placeHolderText = '';
        try {
            placeHolderText =  this.element.nativeElement.placeholder;
        } catch (error) {
            placeHolderText = '';
        }

        const inputTextWidth = this.calculateTextWidth(inputText) + this.extraWidth + this.borderWidth + this.paddingWidth;

        // Min Width
        if (this.minWidth > 0 && (this.minWidth > inputTextWidth)) {
            this.setWidth(this.minWidth);
            return;
        }

        // Placeholder Width
        if (this.includePlaceholder && placeHolderText.length > 0 &&
            (this.calculateTextWidth(placeHolderText) > this.calculateTextWidth(inputText))) {
            this.setWidthByValue(placeHolderText);
            return;
        }

        // Max Width
        if (this.maxWidth > 0 && (this.maxWidth < inputTextWidth)) {
            this.setWidth(this.maxWidth);
            return;
        }

        this.setWidthByValue(inputText);
    }

    calculateTextWidth(value: string) {
        const style = this.getStyle();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx!.font = `${style.fontSize}px ${style.fontFamily}`;
        return ctx!.measureText(value).width;
    }

    getStyle() {
        const style = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size');
        const fontFamily = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family');
        const fontSize = parseFloat(style);

        return {fontFamily: fontFamily, fontSize: fontSize};
    }

    setWidth(width: any) {
        this.element.nativeElement.style.width = width + 'px';
    }

    setWidthByValue(value: any) {
        this.element.nativeElement.style.width =
            this.calculateTextWidth(value) +
            this.extraWidth +
            this.borderWidth +
            this.paddingWidth +
            'px';
    }
}
