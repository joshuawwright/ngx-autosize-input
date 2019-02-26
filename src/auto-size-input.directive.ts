import {ElementRef, HostListener, Directive, AfterContentChecked, Input, OnChanges, SimpleChanges, Renderer2} from '@angular/core';

@Directive({
    selector: '[AutoSizeInput]',
})
export class AutoSizeInputDirective implements AfterContentChecked, OnChanges {

    @Input() extraWidth = 0;
    @Input() includePlaceholder = true;
    @Input() includeBorders = false;
    @Input() includePadding = true;
    @Input() minWidth = -1;
    @Input() maxWidth = -1;

    borderWidth: number;
    paddingWidth: number;

    @HostListener('input', ['$event.target'])
    public onInput(): void {
        this.adjustWidth();
    }

    constructor(public element: ElementRef, public renderer: Renderer2) {
    }

    ngAfterContentChecked(): void {
        this.adjustWidth();
    }

    ngOnChanges(changes: SimpleChanges): void
    {
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
        const style = this.getStyle(),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d');
        ctx.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        return ctx!.measureText(value).width;
    }

    getStyle() {
        const fontFamily = this.element.nativeElement.style.fontFamily ? this.element.nativeElement.style.fontFamily :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family'),
            fontStyle = this.element.nativeElement.style.fontStyle ? this.element.nativeElement.style.fontStyle :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-style'),
            fontSize = this.element.nativeElement.style.fontSize ? this.element.nativeElement.style.fontSize :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size'),
            fontVariant = this.element.nativeElement.style.fontSize ? this.element.nativeElement.style.fontSize :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-variant'),
            fontWeight = this.element.nativeElement.style.fontWeight ? this.element.nativeElement.style.fontWeight :
                window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-weight');

        return {fontFamily: fontFamily, fontSize: fontSize, fontWeight: fontWeight, fontStyle: fontStyle, fontVariant: fontVariant};
    }

    setWidth(width: any) {
        this.renderer.setStyle(this.element.nativeElement, 'width', width + 'px');
    }

    setWidthByValue(value: any) {
        this.setWidth(this.calculateTextWidth(value) + this.extraWidth + this.borderWidth + this.paddingWidth);
    }
}
