import { Component, OnChanges, input } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-scroll-top-button',
    templateUrl: './scroll-top-button.component.html',
    styleUrls: ['./scroll-top-button.component.scss'],
    imports: [MatMiniFabButton, MatIcon],
})
export class ScrollTopButtonComponent implements OnChanges {
	readonly right = input('12px');

	constructor() {}

	ngOnChanges() {
		window.document.getElementById('scroll-to-top').style['right'] = this.right();
	}

	scrollToTop() {
		window.document.getElementById('TOP').scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}
}
