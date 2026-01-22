import { Component, OnInit, ElementRef, input, viewChild, output } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'app-filter-input',
	templateUrl: './filter-input.component.html',
	styleUrls: ['./filter-input.component.scss'],
	imports: [MatIcon],
})
export class FilterInputComponent implements OnInit {
	readonly placeholder = input<string>(undefined);
	readonly value = input<string>(undefined);
	isFocused = false;
	readonly keyup = output<any>();
	readonly inputBox = viewChild<ElementRef>('inputBox');

	constructor() {}

	ngOnInit() {
		const value = this.value();
		if (value && value !== '') {
			this.inputBox().nativeElement.value = value;
		}
	}

	onKeyup(e) {
		this.keyup.emit(e);
	}

	focusInputBox() {
		this.inputBox().nativeElement.focus();
	}
}
