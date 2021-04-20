# ngx-autosize-input
An Angular directive that automatically adjusts the width of an input element to its content. Unlike other auto-grow directives, it is unique because it both shrinks and increases the width based on the content.

## Versions
The major version will match the Angular major version going forward (Angular 10+). For example version 10, will work for Angular 10.

## Stack Blitz Demo
https://stackblitz.com/edit/ngx-autosize-input-10?file=src/app/app.component.html

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

## Author
Joshua Wright

## License
This project is licensed under the MIT license. See the [License](LICENSE) file for more info.
