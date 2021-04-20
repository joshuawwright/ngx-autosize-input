import {
	AfterViewInit, Directive, ElementRef, HostListener, Inject, Input, OnDestroy, Optional, Renderer2,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
	AUTO_SIZE_INPUT_OPTIONS, AutoSizeInputOptions, DEFAULT_AUTO_SIZE_INPUT_OPTIONS,
} from './auto-size-input.options';
import { WidthProperty } from './width-properties.type';

@Directive({
	selector: '[autoSizeInput]',
})
export class AutoSizeInputDirective implements AfterViewInit, OnDestroy {
	@Input() extraWidth = this.defaultOptions.extraWidth;
	@Input() includeBorders = this.defaultOptions.includeBorders;
	@Input() includePadding = this.defaultOptions.includePadding;
	@Input() includePlaceholder = this.defaultOptions.includePlaceholder;
	@Input() maxWidth = this.defaultOptions.maxWidth;
	@Input() minWidth = this.defaultOptions.minWidth;
	@Input() setParentWidth = this.defaultOptions.setParentWidth;
	@Input() usePlaceHolderWhenEmpty = this.defaultOptions.usePlaceHolderWhenEmpty;
	private destroy$ = new Subject<void>();

	constructor(
		private element: ElementRef,
		@Optional() private ngModel: NgModel,
		@Optional() @Inject(AUTO_SIZE_INPUT_OPTIONS) readonly options: AutoSizeInputOptions,
		private renderer: Renderer2,
	) {
	}

	get borderWidth(): number {
		return this.includeBorders ? this._sumPropertyValues(['border-right', 'border-left']) : 0;
	}

	get defaultOptions() {
		return this.options || DEFAULT_AUTO_SIZE_INPUT_OPTIONS;
	}

	get paddingWidth(): number {
		return this.includePadding ? this._sumPropertyValues(['padding-left', 'padding-right']) : 0;
	}

	get style() {
		return getComputedStyle(this.element.nativeElement, '');
	}

	ngAfterViewInit() {
		if (this.ngModel) {
			this.ngModel.valueChanges.pipe(
				tap(() => this.updateWidth()),
				takeUntil(this.destroy$),
			).subscribe();
		} else {
			this.updateWidth();
		}
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	@HostListener('input', ['$event.target'])
	public onInput(event: Event): void {
		if (!this.ngModel) this.updateWidth();
	}

	setWidth(width: number): void {
		const { nativeElement } = this.element;
		const parent = this.renderer.parentNode(nativeElement);
		this.setParentWidth ? this.renderer.setStyle(parent, 'width', width + 'px')
			: this.renderer.setStyle(nativeElement, 'width', width + 'px');
	}

	setWidthUsingText(text: string): void {
		this.setWidth(this.textWidth(text) + this.extraWidth + this.borderWidth + this.paddingWidth);
	}

	// Check placeholder width settings and set text width
	textForWidth(inputText: string, placeHolderText: string, setPlaceHolderWidth: boolean) {
		return (setPlaceHolderWidth && (inputText.length === 0 || !this.usePlaceHolderWhenEmpty)) ?
			placeHolderText : inputText;
	}

	textWidth(value: string): number {
		const ctx = this.renderer.createElement('canvas').getContext('2d');
		const { fontStyle, fontVariant, fontWeight, fontSize, fontFamily } = this.style;

		// font string format: {normal, normal, 700, 20px, Roboto, "Helvetica Neue", sans-serif}
		ctx.font = fontStyle + ' ' + fontVariant + ' ' + fontWeight + ' ' + fontSize + ' ' + fontFamily;
		return ctx!.measureText(value).width;
	}

	updateWidth(): void {
		const inputText = (this.ngModel ? this.ngModel.value : this._getProperty('value')) || '';
		const placeHolderText = this._getProperty('placeholder');
		const inputTextWidth = this.textWidth(inputText) + this.extraWidth + this.borderWidth + this.paddingWidth;
		const setMinWidth = this.minWidth > 0 && this.minWidth > inputTextWidth;
		const setPlaceHolderWidth = this.includePlaceholder && placeHolderText.length > 0 &&
			(this.textWidth(placeHolderText) > this.textWidth(inputText));
		const setMaxWidth = this.maxWidth > 0 && (this.maxWidth < inputTextWidth);

		if (setMinWidth) {
			this.setWidth(this.minWidth);
		} else if (setMaxWidth) {
			this.setWidth(this.maxWidth);
		} else {
			this.setWidthUsingText(this.textForWidth(inputText, placeHolderText, setPlaceHolderWidth));
		}
	}

	private _getProperty(property: 'value'|'placeholder') {
		return this.element.nativeElement?.[property];
	}

	private _sumPropertyValues(properties: WidthProperty[]): number {
		return properties.map(property => parseInt(this.style.getPropertyValue(property), 10))
			.reduce((a, b) => a + b, 0);
	}
}
