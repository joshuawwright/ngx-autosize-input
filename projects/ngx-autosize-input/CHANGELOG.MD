##11.0.0 - 11.0.4
Added use placeholder when empty feature, that sets the width to the placeholder only when the input is empty.

##11.0.0 - 11.0.1
Upgraded to Angular 11.

##10.0.6
Improved support for NgModel, and added takeUntil logic to prevent memory leaks.

##10.0.5
Simplified code and added ability to inject options.

##10.0.2 - 10.0.4
Fixed ChangeDetection.OnPush compatibility.

##10.0.1
Updated StackBlitz link in readMe.

##10.0.0
From now on the major version will be the same as the angular version.
Renamed directive from AutoSizeInput to autoSizeInput, to match Angular Style Guide.
Remove Internet Explorer detection, as the user agent styling can be adjusted using CSS.
Added support for NgModel, so that ChangeDetectionStrategy.OnPush can be used.

##2.3.6
Fixed AOT support, onInput was missing event parameter.

##2.3.5
Added support for IE and Edge

##2.3.4
Added changelog

##2.3.3
Added [setParentWidth] documentation to README.md

##2.3.2
Renamed directive functions and refactored code to reduce package complexity and size.
Removed ngOnChanges width update.

##2.3.1
Added ngOnChanges width update.

##2.3.0
Migrated to Angular library structure
Switched to using renderer to follow angular best practices
