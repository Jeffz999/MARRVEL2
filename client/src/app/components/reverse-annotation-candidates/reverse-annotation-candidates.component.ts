import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-reverse-annotation-candidates',
    templateUrl: './reverse-annotation-candidates.component.html',
    styleUrls: ['./reverse-annotation-candidates.component.scss'],
    imports: [
        NavbarComponent,
        NgIf,
        NgFor,
    ],
})
export class ReverseAnnotationCandidatesComponent implements OnInit {
	protein: string;

	loading = true;
	data;

	constructor(
		private route: ActivatedRoute,
		private api: ApiService,
	) {}

	ngOnInit() {
		this.route.params.subscribe((param) => {
			this.protein = param.protein || null;

			this.api
				.getGenomLocByProteinVar(this.protein)
				.pipe(take(1))
				.subscribe(
					(res) => {
						this.loading = false;
						this.data = res;
					},
					(err) => {
						this.loading = false;
						this.data = null;
						console.log(err);
					},
				);
		});
	}
}
