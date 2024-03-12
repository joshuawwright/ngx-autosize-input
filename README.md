# ngx-autosize-input

An Angular directive that automatically adjusts the width of an input element to its content. Unlike other auto-grow directives, it is unique because it both shrinks and increases the width based on the content.

[![npm](https://img.shields.io/npm/v/ngx-autosize-input.svg?style=flat-square)](https://www.npmjs.com/package/ng-packagr)
[![npm License](https://img.shields.io/npm/l/ngx-autosize-input.svg?style=flat-square)](https://github.com/ng-packagr/ng-packagr/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/joshuawwright/ngx-autosize-input.svg?label=GitHub%20Stars&style=flat-square)](https://https://github.com/joshuawwright/ngx-autosize-input)
[![npm Downloads](https://img.shields.io/npm/dw/ngx-autosize-input.svg?style=flat-square)](https://www.npmjs.com/package/ngx-autosize-input)

## Versions

The major version will match the Angular major version going forward (Angular 10+). For example version 10, will work for Angular 10.

## Stack Blitz Demo

https://stackblitz.com/edit/angular-ivy-dtjmsk?file=src/app/hello.component.ts

## Installation

```bash
npm install ngx-autosize-input
```

Add AutoSizeInputModule to your @NgModule imports:

```typescript
import {AutoSizeInputModule} from 'ngx-autosize-input';

@NgModule({
  imports: [
    AutoSizeInputModule
  ]
})
```

The input options can be set from a provider (see below), or from the template (skip to the next section).

```typescript
import {AUTO_SIZE_INPUT_OPTIONS, AutoSizeInputModule, AutoSizeInputOptions} from 'ngx-autosize-input';

const CUSTOM_AUTO_SIZE_INPUT_OPTIONS: AutoSizeInputOptions = {
  extraWidth: 0,
  includeBorders: false,
  includePadding: true,
  includePlaceholder: true,
  maxWidth: -1,
  minWidth: -1,
  setParentWidth: false,
  usePlaceHolderWhenEmpty: false,
}

@NgModule({
  imports: [
    AutoSizeInputModule
  ],
  providers: [
    { provide: AUTO_SIZE_INPUT_OPTIONS, useValue: CUSTOM_AUTO_SIZE_INPUT_OPTIONS }
  ]
})
```

## Use Example

Use directly in your HTML templates on an input element:

```
<input autoSizeInput>
```

## Using Bootstrap

If using Bootstrap, set the directive to include borders so that the text is not cut off.

```
<input autoSizeInput [includeBorders]=true>
```

## Parameters

The following parameters customize the directive.

### \[extraWidth]

Add extra width, in units of pixels.

Default Value: 0px

Example (add 10px):

```
<input autoSizeInput [extraWidth]="10">
```

### \[includePlaceholder]

Set placeholder text width as minimum width;
Note that [minimumWidth] will override this property.

Default Value: true

Example (turn off placeholder):

```
<input autoSizeInput [includePlaceholder]="false">
```

### \[includeBorders]

Includes border width, so that text is not cut off.
Note only even left and right borders are supported at this time.

Default Value: false

Example (turn on include borders):

```
<input autoSizeInput [includeBorders]="true">
```

### \[includePadding]

Includes padding width, so that text is not cut off.

Default Value: true

Example (turn off include padding):

```
<input autoSizeInput [includePadding]="false">
```

### \[minWidth]

Sets minimum width, in units of pixels.

Default Value: 0

Example (50px minimum width):

```
<input autoSizeInput [minWidth]="50">
```

### \[maxWidth]

Sets maximum width, in units of pixels.

Default Value: 0

Example (100px maximum width):

```
<input autoSizeInput [maxWidth]="100">
```

### \[setParentWidth]

Sets parent width automatically, instead of input width. Useful when you need to update a parent's width.

Default Value: false

Example (input wrapped in an Angular Material form field component):

```
<mat-form-field> // This will be resized
   <input autoSizeInput [setParentWidth]="true">
</mat-form-field>
```

### \[usePlaceholderWhenEmpty]

Sets width to placeholder width, only when value is empty.

Default Value: false

Example (turn on placeholder when empty):

```
<input autoSizeInput [usePlaceholderWhenEmpty]="true">
```

### \[useValueProperty]

If the value of the form control is an object but the input value is formatted setting this
value to true will use the value property of the input instead of retreiving the value from
the form control or model. This option is not globally configurable and must be set on each input.

Default Value: false

Example (ngbTypeahead with inputFormatter):
`search$` returns an array of objects `{ firstName: string; lastName: string; }[]` and `formatInput` transforms the selected object to `` `${firstName} ${lastName}` ``. The value applied to the form control will be the object
selected so in-order to get the actual string value in the input we need to look at the value property.

```
<input autoSizeInput [useValueProperty]="true" formControlName="fullName" [ngbTypeahead]="search$" [inputFormatter]="formatInput">
```

## Author

Joshua Wright

## License

This project is licensed under the MIT license. See the [License](LICENSE) file for more info.
