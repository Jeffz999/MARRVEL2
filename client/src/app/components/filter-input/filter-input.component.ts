import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-filter-input',
    templateUrl: './filter-input.component.html',
    styleUrls: ['./filter-input.component.scss'],
    imports: [NgClass, MatIcon],
})
export class FilterInputComponent implements OnInit {
	readonly placeholder = input<string>(undefined);
	readonly value = input<string>(undefined);
	isFocused = false;
	@Output() keyup: EventEmitter<any> = new EventEmitter();
	@ViewChild('inputBox', { static: true }) inputBox: ElementRef;

	constructor() {}

	ngOnInit() {
		const value = this.value();
  if (value && value !== '') {
			this.inputBox.nativeElement.value = value;
		}
	}

	onKeyup(e) {
		this.keyup.emit(e);
	}

	focusInputBox() {
		this.inputBox.nativeElement.focus();
	}
}
