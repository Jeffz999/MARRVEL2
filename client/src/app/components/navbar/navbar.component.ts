import { Component, input, signal } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SearchBoxComponent } from '../search-box/search-box.component';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
	animations: [
		trigger('toggle', [
			state('true', style({ opacity: 1, 'min-height': '12em' })),
			state('void', style({ opacity: 0, height: '0em' })),
			transition(':enter', animate('500ms ease-in-out')),
			transition(':leave', animate('500ms ease-in-out')),
		]),
	],
	imports: [MatToolbar, RouterLink, RouterLinkActive, MatIconButton, MatIcon, SearchBoxComponent],
})
export class NavbarComponent {
	elevation = input(false);
	showSearch = input(false);
	fixed = input(false);

	searchOpened = signal(false);

	toggleSearch() {
		this.searchOpened.update((v) => !v);
	}
}
