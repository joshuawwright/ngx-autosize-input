# ngx-autosize-input
An Angular directive that automatically adjusts the width of an input element to its content. Unlike other auto-grow directives, it is unique because it both shrinks and increases the width based on the content.

## Plunker Demo
https://stackblitz.com/edit/ngx-autosize-input

## Installation

```bash
npm install ngx-autosize-input
```

Add AutoSizeInputModule to your @NgModule imports:

```typescript
import {AutoSizeInputModule} from 'ngx-autosize-input';

...

@NgModule({
  imports: [
    AutoSizeInputModule
  ]
})
```

## Use Example
Use directly in your HTML templates on an input element:
 ```
<input AutoSizeInput>
```

## Parameters
The following parameters customize the directive.

### \[extraWidth]

Add extra width, in units of pixels.

Default Value: 0px

Example (add 10px): 
 ```
<input AutoSizeInput [extraWidth]="10">
```

### \[includePlaceholder]

Set placeholder text width as minimum width;
Note that [minimumWidth] will override this property.

Default Value: true

Example (turn off placeholder): 
 ```
<input AutoSizeInput [includePlaceholder]="false">
```

### \[includeBorders]

Includes border width, so that text is not cut off.
Note only even left and right borders are supported at this time.

Default Value: true

Example (turn off include borders): 
 ```
<input AutoSizeInput [includeBorders]="false">
```

### \[includePadding]

Includes padding width, so that text is not cut off.

Default Value: true

Example (turn off include padding): 
 ```
<input AutoSizeInput [includePadding]="false">
```

### \[minWidth]

Sets minimum width, in units of pixels.

Default Value: 0

Example (50px minimum width): 
 ```
<input AutoSizeInput [minWidth]="50">
```

### \[maxWidth]

Sets maximum width, in units of pixels.

Default Value: 0

Example (100px maximum width): 
 ```
<input AutoSizeInput [maxWidth]="100">
```

## Author
Joshua Wright

## License
This project is licensed under the MIT license. See the [License](LICENSE) file for more info.
