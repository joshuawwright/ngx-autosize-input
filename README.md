# ngx-autosize-input
is an Angular directive that automatically adjusts the width of an input element to its content. Unlike other auto-grow directives, it is unique because it both shrinks and increases the width based on the content.

## Demo
(To Be Added)

## Installation

```bash
npm install ngx-autosize-input
```

Add import and declaration to your @NgModule:

```typescript
import {InputAutoSizeDirective} from 'ngx-autosize-input';

...

@NgModule({
  declarations: [
    appAutoSizeInput
  ]
})
```

## Use Example
Use directly in your HTML templates on an input element:
<input appAutoSizeInput>

## Author
Joshua Wright

## License
This project is licensed under the MIT license. See the [License](LICENSE) file for more info.
