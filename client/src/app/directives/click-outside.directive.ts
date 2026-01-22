import { Directive, ElementRef, HostListener, output } from '@angular/core';

/* tslint:disable:directive-selector */
@Directive({ selector: '[clickOutside]', })
/* tslint:enable:directive-selector */
export class ClickOutsideDirective {
	constructor(private _elementRef: ElementRef) {}

	public readonly clickOutside = output();

	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement) {
		const clickedInside = this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit(null);
		}
	}
}
