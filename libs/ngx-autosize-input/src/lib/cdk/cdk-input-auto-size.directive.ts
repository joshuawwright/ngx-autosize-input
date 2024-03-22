import {Directive, DoCheck, ElementRef, Input} from '@angular/core';

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
export class CdkInputAutosize implements DoCheck {
  @Input('cdkInputAutosizeMinWidth') minWidth?: number;
  @Input('cdkInputAutosizeMaxWidth') maxWidth?: number;
  @Input('cdkInputAutosizeUsePlaceHolderOnlyWhenEmpty') usePlaceHolderOnlyWhenEmpty = true;
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
    let clone = this._inputElement.cloneNode(false) as HTMLTextAreaElement;

    clone.value = value;
    clone.style.position = 'absolute';
    clone.style.border = 'none';
    clone.style.padding = '0';
    clone.style.height = '';
    clone.style.minWidth = '';
    clone.style.width = '0px';
    clone.style.maxWidth = '';

    this._inputElement.parentNode!.appendChild(clone);

    return clone;
  }

  protected _getWidths() {
    const inputClone = this._createInputWithValue(this._inputElement.value);
    const placeHolderClone = this._createInputWithValue(this._inputElement.placeholder);

    const widths = {inputWidth: inputClone.scrollWidth, placeholderWidth: placeHolderClone.scrollWidth}

    inputClone.remove();
    placeHolderClone.remove();

    return widths
  }

  protected _resizeToFitContent() {
    let {inputWidth, placeholderWidth} = this._getWidths()

    let width: number;

    if (this.usePlaceHolderOnlyWhenEmpty) {
      width = this._inputElement.value === '' ? placeholderWidth : inputWidth;
    } else {
      width = placeholderWidth >= inputWidth ? placeholderWidth : inputWidth;
    }

    if (this.minWidth !== undefined) {
      width = Math.max(width, this.minWidth);
    }

    if (this.maxWidth !== undefined) {
      width = Math.min(width, this.maxWidth);
    }

    this._elementRef.nativeElement.style.width = width + 'px'
  }
}
