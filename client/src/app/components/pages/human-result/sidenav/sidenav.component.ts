import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DOCUMENT, NgClass, NgIf } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    imports: [
        MatIconButton,
        MatIcon,
        NgClass,
        NgIf,
        MatTooltip,
    ],
})
export class SidenavComponent implements OnChanges {
	@Input() gene: object | null;
	@Input() variant: string | null;
	@Output() change: EventEmitter<any> = new EventEmitter();

	@Input() sidenavOpened = true;
	@Input() smallScreen = false;

	constructor() {}

	ngOnChanges(): void {}

	toggleSidenav(): void {
		this.sidenavOpened = !this.sidenavOpened;
		this.change.emit({
			sidenavOpened: this.sidenavOpened,
		});
	}

	scrollTo(id: string): void {
		this.change.emit({
			scrollTo: id,
		});
	}
}
