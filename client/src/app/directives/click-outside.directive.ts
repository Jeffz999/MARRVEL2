import { Directive, ElementRef, HostListener, output, inject } from '@angular/core';

/* tslint:disable:directive-selector */
@Directive({ selector: '[clickOutside]', })
/* tslint:enable:directive-selector */
export class ClickOutsideDirective {
	private _elementRef = inject(ElementRef);


	public readonly clickOutside = output();

	@HostListener('document:click', ['$event.target'])
	public onClick(targetElement) {
		const clickedInside = this._elementRef.nativeElement.contains(targetElement);
		if (!clickedInside) {
			this.clickOutside.emit(null);
		}
	}
}
