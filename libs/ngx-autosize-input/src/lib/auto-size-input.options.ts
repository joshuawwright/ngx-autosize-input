import { InjectionToken } from '@angular/core';

export const AUTO_SIZE_INPUT_OPTIONS = new InjectionToken<AutoSizeInputOptions>(
  'autosize-input-options'
);

export interface AutoSizeInputOptions {
  extraWidth: number;
  includeBorders: boolean;
  includePadding: boolean;
  includePlaceholder: boolean;
  maxWidth: number;
  minWidth: number;
  setParentWidth: boolean;
  usePlaceHolderWhenEmpty: boolean;
}

export const DEFAULT_AUTO_SIZE_INPUT_OPTIONS: AutoSizeInputOptions = {
  extraWidth: 0,
  includeBorders: false,
  includePadding: true,
  includePlaceholder: true,
  maxWidth: -1,
  minWidth: -1,
  setParentWidth: false,
  usePlaceHolderWhenEmpty: false,
};
