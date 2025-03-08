import 'jest-canvas-mock';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { AutoSizeInputDirective } from './auto-size-input.directive';
import { Component, DebugElement, Renderer2 } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe(AutoSizeInputDirective.name, () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, AutoSizeInputDirective, ReactiveFormsModule,
        ControlComponent,
        ModelComponent,
        TestComponent,],
      providers: [Renderer2],
    }).compileComponents();
  });

  describe('no control or model', () => {
    let fixture: ComponentFixture<TestComponent>;
    let inputElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.css('input'));
    });

    it(`should use value property`, () => {
      inputElement.nativeElement.value = 'test123';

      inputElement.triggerEventHandler('input');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        '9px'
      );
    });
  });

  describe('ngModel', () => {
    let fixture: ComponentFixture<ModelComponent>;
    let component: ModelComponent;
    let inputElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(ModelComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.css('input'));
    });

    it(`should work with ngModel`, fakeAsync(() => {
      component.model = 'test';

      fixture.detectChanges();
      tick();

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        '6px'
      );
    }));
  });

  describe('ngControl', () => {
    let fixture: ComponentFixture<ControlComponent>;
    let component: ControlComponent;
    let inputElement: DebugElement;
    let parentElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(ControlComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.css('input'));
      parentElement = fixture.debugElement.query(By.css('div'));
    });

    it(`should include border width if includeBorders is "true"`, () => {
      component.includeBorders = true;
      component.borderWidthInPx = { left: 2, right: 1 };
      fixture.detectChanges();

      component.control.patchValue('');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        `${component.borderWidthInPx.left + component.borderWidthInPx.right}px`
      );
    });

    it(`should exclude border width if includeBorders is "false"`, () => {
      component.includeBorders = false;
      component.borderWidthInPx = { left: 2, right: 1 };
      fixture.detectChanges();

      component.control.patchValue('');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        '0px'
      );
    });

    it(`should include border width if includePadding is "true"`, () => {
      component.includePadding = true;
      component.paddingWidthInPx = { left: 2, right: 1 };
      fixture.detectChanges();

      component.control.patchValue('');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        `${
          component.paddingWidthInPx.left + component.paddingWidthInPx.right
        }px`
      );
    });

    it(`should exclude padding width if includePadding is "false"`, () => {
      component.includePadding = false;
      component.paddingWidthInPx = { left: 2, right: 1 };
      fixture.detectChanges();

      component.control.patchValue('');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        '0px'
      );
    });

    it(`should set width to minWidth if input width is less than minimum`, () => {
      component.minWidth = 10;
      fixture.detectChanges();

      component.control.patchValue('');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        `${component.minWidth}px`
      );
    });

    it(`should set width to maxWidth if input width is greater than maximum`, () => {
      component.maxWidth = 1;
      fixture.detectChanges();

      component.control.patchValue('test');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        `${component.maxWidth}px`
      );
    });

    it(`should set parent width`, () => {
      component.setParentWidth = true;
      fixture.detectChanges();

      component.control.patchValue('1234');

      expect(getComputedStyle(parentElement.nativeElement, '').width).toEqual(
        '4px'
      );
    });

    it(`should use placeholder width when includePlaceholder is "true" and input is empty`, () => {
      component.includePlaceholder = true;
      component.placeholder = 'test';
      fixture.detectChanges();

      component.control.patchValue('');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        '4px'
      );
    });

    it(`should use placeholder width when includePlaceholder is "true" and usePlaceHolderWhenEmpty is "false"`, () => {
      component.includePlaceholder = true;
      component.usePlaceHolderWhenEmpty = false;
      component.placeholder = 'test';
      inputElement.nativeElement.value = '12';
      fixture.detectChanges();

      component.control.patchValue('12');

      expect(getComputedStyle(inputElement.nativeElement, '').width).toEqual(
        '4px'
      );
    });
  });
});

@Component({
  standalone: true,
  imports: [
    AutoSizeInputDirective,
    ReactiveFormsModule
  ],
  template: ` <div>
      <input
        autoSizeInput
        [extraWidth]="extraWidth"
        [includeBorders]="includeBorders"
        [includePadding]="includePadding"
        [includePlaceholder]="includePlaceholder"
        [maxWidth]="maxWidth"
        [minWidth]="minWidth"
        [setParentWidth]="setParentWidth"
        [usePlaceHolderWhenEmpty]="usePlaceHolderWhenEmpty"
        [useValueProperty]="useValueProperty"
        [formControl]="control"
        [style.border-left-width.px]="borderWidthInPx.left"
        [style.border-right-width.px]="borderWidthInPx.right"
        [style.padding-left.px]="paddingWidthInPx.left"
        [style.padding-right.px]="paddingWidthInPx.right"
        [placeholder]="placeholder"
      />
    </div>
    >`,
})
class ControlComponent {
  extraWidth = 0;
  includeBorders = false;
  includePadding = false;
  includePlaceholder = false;
  maxWidth = -1;
  minWidth = -1;
  setParentWidth = false;
  usePlaceHolderWhenEmpty = false;
  useValueProperty = false;
  control = new FormControl('');
  borderWidthInPx = { left: 0, right: 0 };
  paddingWidthInPx = { left: 0, right: 0 };
  placeholder = '';
}

@Component({
  standalone: true,
  imports: [
    AutoSizeInputDirective,
    FormsModule
  ],
  template: `<input autoSizeInput [(ngModel)]="model" />`,
})
class ModelComponent {
  model = '';
}

@Component({
  standalone: true,
  imports: [
    AutoSizeInputDirective
  ],
  template: `<input autoSizeInput [useValueProperty]="true" />`,
})
class TestComponent {}
