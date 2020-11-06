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
