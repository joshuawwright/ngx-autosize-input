import {AfterViewInit, Directive, DoCheck, ElementRef, Input} from '@angular/core';

@Directive({
  selector: 'input[cdkInputAutosize]',
  exportAs: 'cdkInputAutosize',
  host: {
    'class': 'cdk-input-autosize',
    '[style.width]': '_initialWidth',
    '(input)': '_resizeToFitContent()',
  },
  standalone: true,
})
export class CdkInputAutosizeDirective implements DoCheck, AfterViewInit {
  @Input() cdkInputAutosizeMinWidth?: number;
  @Input() cdkInputAutosizeMaxWidth?: number;
  @Input() cdkInputAutosizeUsePlaceHolderOnlyWhenEmpty = true;
  protected _initialWidth = '0px'

  constructor(
    private _elementRef: ElementRef<HTMLInputElement>
  ) {
  }

  private get _inputElement() {
    return this._elementRef.nativeElement as HTMLInputElement;
  }

  ngAfterViewInit() {
    this._resizeToFitContent()
  }

  ngDoCheck() {
    this._resizeToFitContent();
  }

  protected _createInputWithValue(value: string) {
    const clone = this._inputElement.cloneNode(false) as HTMLTextAreaElement;

    clone.value = value;
    clone.style.position = 'absolute';
    clone.style.border = 'none';
    clone.style.padding = '0';
    clone.style.height = '';
    clone.style.minWidth = '';
    clone.style.width = '0px';
    clone.style.maxWidth = '';

    this._inputElement.parentNode?.appendChild(clone);

    return clone;
  }

  protected _getWidths() {
    const inputClone = this._createInputWithValue(this._inputElement.value);
    const placeHolderClone = this._createInputWithValue(this._inputElement.placeholder);

    const widths = {inputWidth: inputClone.scrollWidth, placeholderWidth: placeHolderClone.scrollWidth}

    inputClone.remove();
    placeHolderClone.remove();

    return widths;
  }

  protected _resizeToFitContent() {
    const {inputWidth, placeholderWidth} = this._getWidths()

    let width: number;

    if (this.cdkInputAutosizeUsePlaceHolderOnlyWhenEmpty) {
      width = this._inputElement.value === '' ? placeholderWidth : inputWidth;
    } else {
      width = placeholderWidth >= inputWidth ? placeholderWidth : inputWidth;
    }

    if (this.cdkInputAutosizeMinWidth !== undefined) {
      width = Math.max(width, this.cdkInputAutosizeMinWidth);
    }

    if (this.cdkInputAutosizeMaxWidth !== undefined) {
      width = Math.min(width, this.cdkInputAutosizeMaxWidth);
    }

    this._elementRef.nativeElement.style.width = width + 'px'
  }
}
