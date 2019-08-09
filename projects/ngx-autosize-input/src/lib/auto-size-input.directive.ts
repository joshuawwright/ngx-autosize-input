import { AfterContentChecked, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FontStyle } from './font-styles.interface';
import { InputProperty } from './input-properties.type';

@Directive({
	selector: '[AutoSizeInput]'
})
export class AutoSizeInputDirective implements AfterContentChecked
{
	@Input() extraWidth = 0;

	@Input() includeBorders = false;

	@Input() includePadding = true;

	@Input() includePlaceholder = true;

	@Input() maxWidth = -1;

	@Input() minWidth = -1;

	private _borderWidth:number;

	private _paddingWidth:number;

	constructor(private element:ElementRef, private renderer:Renderer2)
	{
	}

	ngAfterContentChecked():void
	{
		this.updateWidth();
	}

	calculateTextWidth(value:string):number
	{
		const style = this.getStyle();
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		ctx.font = `${ style.fontStyle } ${ style.fontVariant } ${ style.fontWeight } ${ style.fontSize } ${ style.fontFamily }`;
		return ctx!.measureText(value).width;
	}

	getStyle():FontStyle
	{
		const fontFamily = this.element.nativeElement.style.fontFamily ? this.element.nativeElement.style.fontFamily :
			window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-family'),
			fontStyle = this.element.nativeElement.style.fontStyle ? this.element.nativeElement.style.fontStyle :
				window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-style'),
			fontSize = this.element.nativeElement.style.fontSize ? this.element.nativeElement.style.fontSize :
				window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-size'),
			fontVariant = this.element.nativeElement.style.fontVariant ? this.element.nativeElement.style.fontVariant :
				window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-variant'),
			fontWeight = this.element.nativeElement.style.fontWeight ? this.element.nativeElement.style.fontWeight :
				window.getComputedStyle(this.element.nativeElement, '').getPropertyValue('font-weight');

		return {
			fontFamily: fontFamily,
			fontSize: fontSize,
			fontWeight: fontWeight,
			fontStyle: fontStyle,
			fontVariant: fontVariant
		};
	}

	@HostListener('input', ['$event.target'])
	public onInput():void
	{
		this.updateWidth();
	}

	setWidth(width:number):void
	{
		const element = this.element.nativeElement;
		const parent = this.renderer.parentNode(element);
		parent.classList.contains('mat-form-field-infix') ? this.renderer.setStyle(parent, 'width', width + 'px')
			: this.renderer.setStyle(element, 'width', width + 'px');
	}

	setWidthByValue(value:string):void
	{
		this.setWidth(this.calculateTextWidth(value) + this.extraWidth + this._borderWidth + this._paddingWidth);
	}

	updateWidth():void
	{
		this._borderWidth = this.includeBorders ? 2 * this._getPropertyWidth('border') : 0;

		this._paddingWidth = this.includePadding ?
			this._getPropertyWidth('padding-left') + this._getPropertyWidth('padding-right') : 0;

		const inputText = this._getPropertyValue('value');
		const placeHolderText = this._getPropertyValue('placeholder');
		const inputTextWidth =
			this.calculateTextWidth(inputText) + this.extraWidth + this._borderWidth + this._paddingWidth;
		const setMinWidth = this.minWidth > 0 && this.minWidth > inputTextWidth;
		const setPlaceHolderWidth = this.includePlaceholder && placeHolderText.length > 0 &&
			(this.calculateTextWidth(placeHolderText) > this.calculateTextWidth(inputText));
		const setMaxWidth = this.maxWidth > 0 && (this.maxWidth < inputTextWidth);

		if (setMinWidth)
		{
			this.setWidth(this.minWidth);
			return;
		}

		if (setPlaceHolderWidth)
		{
			this.setWidthByValue(placeHolderText);
			return;
		}

		if (setMaxWidth)
		{
			this.setWidth(this.maxWidth);
			return;
		}

		this.setWidthByValue(inputText);
	}

	private _getPropertyValue(property:'value'|'placeholder')
	{
		try
		{
			return this.element.nativeElement[property];
		}
		catch (error)
		{
			return '';
		}
	}

	private _getPropertyWidth(property:InputProperty):number
	{
		const width = getComputedStyle(this.element.nativeElement, '').getPropertyValue(property);
		return parseInt(width, 10);
	}
}
