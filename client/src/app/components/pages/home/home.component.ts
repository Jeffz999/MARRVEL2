import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { MatIcon } from '@angular/material/icon';
import { SearchBoxComponent } from '../../search-box/search-box.component';
import { MailchimpComponent } from '../../mailchimp/mailchimp.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [
        NavbarComponent,
        MatIcon,
        SearchBoxComponent,
        MailchimpComponent,
        FooterComponent,
    ],
})
export class HomeComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
