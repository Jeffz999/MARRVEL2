import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MailchimpComponent } from '../../mailchimp/mailchimp.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.scss'],
	imports: [NavbarComponent, MailchimpComponent, FooterComponent],
})
export class AboutComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
