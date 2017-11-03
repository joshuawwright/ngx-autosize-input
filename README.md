# ngx-autosize-input
An Angular directive that automatically adjusts the width of an input element to its content. Unlike other auto-grow directives, it is unique because it both shrinks and increases the width based on the content.

## Plunker Demo
https://embed.plnkr.co/oP9yz3114Z89FVNU1a8z/

## Installation

```bash
npm install ngx-autosize-input
```

Add import and declaration to your @NgModule:

```typescript
import {autoSizeInputModule} from 'ngx-autosize-input';

...

@NgModule({
  declarations: [
    autoSizeInputModule
  ]
})
```

## Use Example
Use directly in your HTML templates on an input element:
<input appAutoSizeInput>

By default this is set up to work well with Boostrap's form control class and inserts 4 extra characters of space.
You can change the spacing from the default using the following attribute: 
 ```
 [extraWidth]
 ```

For example, if you don't want any extra space:
 ```
<input appAutoSizeInput [extraWidth]="0">
```
Note that extraWidth is the width of a single underscore character calculated from the input font and size. So if you
want 4 characters worth of space:
```
<input appAutoSizeInput [extraWidth]="4">
```

## Author
Joshua Wright

## License
This project is licensed under the MIT license. See the [License](LICENSE) file for more info.
