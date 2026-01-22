import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { ScrollTopButtonComponent } from '../../scroll-top-button/scroll-top-button.component';

@Component({
    selector: 'app-faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.scss'],
    imports: [NavbarComponent, ScrollTopButtonComponent],
})
export class FaqComponent implements OnInit {
	constructor() {}

	ngOnInit() {}

	scrollTo(id: string) {
		window.document.getElementById(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}
