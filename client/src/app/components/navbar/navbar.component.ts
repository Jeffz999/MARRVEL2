import { Component, OnInit, Input } from '@angular/core';

import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
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
    imports: [
        MatToolbar,
        RouterLink,
        RouterLinkActive,
        NgIf,
        MatIconButton,
        MatIcon,
        SearchBoxComponent,
    ],
})
export class NavbarComponent implements OnInit {
	@Input() elevation = false;
	@Input() showSearch = false;
	@Input() fixed = false;

	searchOpened = false;

	constructor() {}

	ngOnInit() {}
}
