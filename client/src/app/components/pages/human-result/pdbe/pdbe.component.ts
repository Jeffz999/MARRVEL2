import { Component, OnInit, input, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'app-pdbe',
    templateUrl: './pdbe.component.html',
    styleUrls: ['./pdbe.component.scss'],
    imports: [
    MatIcon,
    MatTooltip
],
})
export class PdbeComponent implements OnInit {
	private apiService = inject(ApiService);

	readonly entrezId = input(undefined);
	loading = true;
	data;

	ngOnInit(): void {
		this.apiService.getPdbeSummaryByEntrezId(this.entrezId()).subscribe(
			(res) => {
				this.loading = false;
				this.data = res;
			},
			(err) => {
				this.loading = false;
				this.data = null;
			},
		);
	}
}
