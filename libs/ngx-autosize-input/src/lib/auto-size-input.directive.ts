import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
} from '@angular/core';
import {NgControl, NgModel} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {
  AUTO_SIZE_INPUT_OPTIONS,
  AutoSizeInputOptions,
  DEFAULT_AUTO_SIZE_INPUT_OPTIONS,
} from './auto-size-input.options';
import {Border} from './border';
import {Padding} from './padding';

@Directive({
  selector: '[autoSizeInput]',
  standalone: true
})
export class AutoSizeInputDirective implements AfterViewInit, OnDestroy {
  @Input() extraWidth: number;
  @Input() includeBorders: boolean;
  @Input() includePadding: boolean;
  @Input() includePlaceholder: boolean;
  @Input() maxWidth: number;
  @Input() minWidth: number;
  @Input() setParentWidth: boolean;
  @Input() usePlaceHolderWhenEmpty: boolean;
  @Input() useValueProperty = false;
  private destroyed$ = new Subject<void>();

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private element: ElementRef,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private renderer: Renderer2,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @Optional() private ngModel?: NgModel,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @Optional() private ngControl?: NgControl,
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @Optional()
    @Inject(AUTO_SIZE_INPUT_OPTIONS)
    readonly options?: AutoSizeInputOptions
  ) {
    const defaultOptions = this.options || DEFAULT_AUTO_SIZE_INPUT_OPTIONS;
    this.extraWidth = defaultOptions.extraWidth;
    this.includeBorders = defaultOptions.includeBorders;
    this.includePadding = defaultOptions.includePadding;
    this.includePlaceholder = defaultOptions.includePlaceholder;
    this.maxWidth = defaultOptions.maxWidth;
    this.minWidth = defaultOptions.minWidth;
    this.setParentWidth = defaultOptions.setParentWidth;
    this.usePlaceHolderWhenEmpty = defaultOptions.usePlaceHolderWhenEmpty;
  }

  private get borderWidth(): number {
    return this.includeBorders
      ? this.sumStylePropertyWidths(Border.left, Border.right)
      : 0;
  }

  private get paddingWidth(): number {
    return this.includePadding
      ? this.sumStylePropertyWidths(Padding.left, Padding.right)
      : 0;
  }

  private get style() {
    return getComputedStyle(this.element.nativeElement, '');
  }

  private get placeholder() {
    return this.element.nativeElement.placeholder;
  }

  private get value() {
    return this.element.nativeElement.value;
  }

  private get inputWidthIsLessThanMinimum(): boolean {
    return this.minWidth > 0 && this.minWidth > this.inputTextWidth;
  }

  private get inputWidthIsGreaterThanMaximum(): boolean {
    return this.maxWidth > 0 && this.maxWidth < this.inputTextWidth;
  }

  private get inputTextWidth(): number {
    return (
      this.getTextWidth(this.input) +
      this.extraWidth +
      this.borderWidth +
      this.paddingWidth
    );
  }

  private get usePlaceholder(): boolean {
    return (
      this.includePlaceholder &&
      this.hasPlaceholder &&
      this.placeHolderWidthGreaterThanInputWidth &&
      (this.inputIsEmpty || !this.usePlaceHolderWhenEmpty)
    );
  }

  private get placeHolderWidthGreaterThanInputWidth() {
    const placeHolderWidth = this.getTextWidth(this.placeholder);
    const inputWidth = this.getTextWidth(this.input);

    return placeHolderWidth > inputWidth;
  }

  private get inputIsEmpty() {
    return this.input.length === 0;
  }

  private get hasPlaceholder() {
    return this.placeholder.length > 0;
  }

  private get input(): string {
    let value = '';
    if (this.useValueProperty) {
      value = this.value;
    } else if (this.ngModel) {
      value = this.ngModel.value;
    } else if (this.ngControl) {
      value = this.ngControl.value;
    }
    return value || this.value || '';
  }

  private get nativeElement() {
    return this.element.nativeElement;
  }

  private get textWidth() {
    const text = this.usePlaceholder ? this.placeholder : this.input;
    return (
      this.borderWidth +
      this.extraWidth +
      this.getTextWidth(text) +
      this.paddingWidth
    );
  }

  ngAfterViewInit() {
    this.updateWidthWhenModelChanges();
    this.updateWidthWhenControlChanges();
    this.updateWidth();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  @HostListener('input')
  onInput(): void {
    if (!this.ngModel && !this.ngControl) {
      this.updateWidth();
    }
  }

  private setWidth(width: number): void {
    const parent = this.renderer.parentNode(this.nativeElement);

    if (this.setParentWidth) {
      this.renderer.setStyle(parent, 'width', width + 'px');
    } else {
      this.renderer.setStyle(this.nativeElement, 'width', width + 'px');
    }
  }

  private getTextWidth(value: string): number {
    const element = this.renderer.createElement('canvas');
    const context = element.getContext('2d');

    const {
      fontStyle,
      fontVariant,
      fontWeight,
      fontSize,
      fontFamily,
      letterSpacing,
    } = this.style;

    // font string format: {normal, normal, 700, 20px, Roboto, "Helvetica Neue", sans-serif}
    context.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize} ${fontFamily}`;
    context.letterSpacing = letterSpacing;

    const width = context.measureText(value).width;
    element.remove();
    return width;
  }

  private updateWidth(): void {
    if (this.inputWidthIsLessThanMinimum) {
      this.setWidth(this.minWidth);
    } else if (this.inputWidthIsGreaterThanMaximum) {
      this.setWidth(this.maxWidth);
    } else {
      this.setWidth(this.textWidth);
    }
  }

  private updateWidthWhenControlChanges() {
    return this.ngControl?.valueChanges
      ?.pipe(
        tap(() => this.updateWidth()),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  private updateWidthWhenModelChanges() {
    return this.ngModel?.valueChanges
      ?.pipe(
        tap(() => this.updateWidth()),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  private sumStylePropertyWidths(...properties: Border[] | Padding[]): number {
    return properties.reduce((sum, property) => {
      const value: string = this.style.getPropertyValue(property);
      const width: number = parseInt(value, 10);
      return sum + width;
    }, 0);
  }
}
