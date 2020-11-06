import { DOCUMENT } from '@angular/common';
import {
	AfterContentChecked, Directive, ElementRef, HostListener, Inject, Input, Optional, Renderer2,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { WidthProperty } from './width-properties.type';

@Directive({
	selector: '[autoSizeInput]',
})
export class AutoSizeInputDirective implements AfterContentChecked {
	@Input() extraWidth = 0;
	@Input() includeBorders = false;
	@Input() includePadding = true;
	@Input() includePlaceholder = true;
	isEdge = false;
	isIE = false;
	@Input() maxWidth = -1;
	@Input() minWidth = -1;
	@Input() setParentWidth = false;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private element: ElementRef,
		@Optional() private ngModel: NgModel,
		private renderer: Renderer2,
	) {
		this.isIE = !!document['DOCUMENT']; // Internet Explorer 6-11
		this.isEdge = !this.isIE && !!window['StyleMedia']; 	// Edge 20+
	}

	get borderWidth(): number {
		return this.includeBorders ? 2 * this._getPropertyWidth('border') : 0;
	}

	get paddingWidth(): number {
		return this.includePadding ?
			this._getPropertyWidth('padding-left') + this._getPropertyWidth('padding-right') : 0;
	}

	ngAfterContentChecked(): void {
		this.updateWidth();
	}

	@HostListener('input', ['$event.target'])
	public onInput(): void {
		this.updateWidth();
	}

	setWidth(width: number): void {
		if (this.isEdge) width = width + 2;

		const element = this.element.nativeElement;
		const parent = this.renderer.parentNode(element);
		this.setParentWidth ? this.renderer.setStyle(parent, 'width', width + 'px')
			: this.renderer.setStyle(element, 'width', width + 'px');
	}

	setWidthUsingText(text: string): void {
		this.setWidth(this.textWidth(text) + this.extraWidth + this.borderWidth + this.paddingWidth);
	}

	textWidth(value: string): number {
		const ctx = this.renderer.createElement('canvas').getContext('2d');
		const style = window.getComputedStyle(this.element.nativeElement, '');
		const fontStyle = style.getPropertyValue('font-style');
		const fontVariant = style.getPropertyValue('font-variant');
		const fontWeight = style.getPropertyValue('font-weight');
		const fontSize = style.getPropertyValue('font-size');
		const fontFamily = style.getPropertyValue('font-family');

		// font string format: {normal, normal, 700, 20px, Roboto, "Helvetica Neue", sans-serif}
		ctx.font = fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily;

		return ctx!.measureText(value).width;
	}

	updateWidth(): void {
		const inputText = this.ngModel ? this.ngModel.value : this._getProperty('value');
		const placeHolderText = this._getProperty('placeholder');
		const inputTextWidth =
			this.textWidth(inputText) + this.extraWidth + this.borderWidth + this.paddingWidth;
		const setMinWidth = this.minWidth > 0 && this.minWidth > inputTextWidth;
		const setPlaceHolderWidth = this.includePlaceholder && placeHolderText.length > 0 &&
			(this.textWidth(placeHolderText) > this.textWidth(inputText));
		const setMaxWidth = this.maxWidth > 0 && (this.maxWidth < inputTextWidth);

		if (setMinWidth) {
			this.setWidth(this.minWidth);
		} else if (setPlaceHolderWidth) {
			this.setWidthUsingText(placeHolderText);
		} else if (setMaxWidth) {
			this.setWidth(this.maxWidth);
		} else {
			this.setWidthUsingText(inputText);
		}
	}

	private _getProperty(property: 'value'|'placeholder') {
		try {
			return this.element.nativeElement[property];
		}
		catch (error) {
			return '';
		}
	}

	private _getPropertyWidth(property: WidthProperty): number {
		const width = window.getComputedStyle(this.element.nativeElement, '').getPropertyValue(property);
		return parseInt(width, 10);
	}
}
