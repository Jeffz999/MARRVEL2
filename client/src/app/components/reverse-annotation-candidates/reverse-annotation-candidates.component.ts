import { Component, OnInit, Input, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { ApiService } from 'src/app/services/api.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
    selector: 'app-reverse-annotation-candidates',
    templateUrl: './reverse-annotation-candidates.component.html',
    styleUrls: ['./reverse-annotation-candidates.component.scss'],
    imports: [
    NavbarComponent
],
})
export class ReverseAnnotationCandidatesComponent implements OnInit {
	private route = inject(ActivatedRoute);
	private api = inject(ApiService);

	protein: string;

	loading = true;
	data;

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
