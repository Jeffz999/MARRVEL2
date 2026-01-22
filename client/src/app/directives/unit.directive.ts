import { Directive, ElementRef, OnChanges, input, inject } from '@angular/core';

@Directive({ selector: '[appUnit]', })
export class UnitDirective implements OnChanges {
	private el = inject(ElementRef);

	readonly count = input<number>(undefined);
	readonly unit = input<string>(undefined);
	readonly plural = input<string>(undefined);

	ngOnChanges() {
		this.plural = this.plural() || this.unit() + 's';
		this.count = this.count() || 0;
		const unit = this.unit();
  if (!unit || unit === '') {
			this.el.nativeElement.innerHTML = '' + this.count();
		} else if (this.count() >= 2) {
			this.el.nativeElement.innerHTML = `${this.count()} ${this.plural()}`;
		} else {
			this.el.nativeElement.innerHTML = `${this.count()} ${unit}`;
		}
	}
}
