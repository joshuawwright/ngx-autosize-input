/**
 * Created by Joshua Wright on 11/2/2017
 */
import { ElementRef, AfterContentChecked } from '@angular/core';
export declare class AutoSizeInputDirective implements AfterContentChecked {
    element: ElementRef;
    extraWidth: number;
    onInput(): void;
    constructor(element: ElementRef);
    ngAfterContentChecked(): void;
    adjustWidth(): void;
    getTextWidth(value: string, fontSize: any, fontFamily: string): number;
}
