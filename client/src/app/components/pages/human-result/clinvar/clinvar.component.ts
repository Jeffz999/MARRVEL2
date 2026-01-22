import { Component, OnInit, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { take } from 'rxjs/operators';

import { ApiService } from '../../../../services/api.service';
import { HumanGene } from '../../../../interfaces/gene';
import { Variant } from '../../../../interfaces/variant';

import { Animations } from '../../../../animations';
import { NgIf } from '@angular/common';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { UnitDirective } from '../../../../directives/unit.directive';
import { ClinvarVariantsTableComponent } from './clinvar-variants-table/clinvar-variants-table.component';

@Component({
    selector: 'app-clinvar',
    templateUrl: './clinvar.component.html',
    styleUrls: ['./clinvar.component.scss'],
    animations: [Animations.toggle],
    imports: [
        NgIf,
        MatProgressBar,
        MatButton,
        MatIcon,
        MatTooltip,
        UnitDirective,
        ClinvarVariantsTableComponent,
    ],
})
export class ClinvarComponent implements OnInit {
	readonly gene = input<HumanGene>(undefined);
	readonly variant = input<Variant>(undefined);

	urlSearchTerm: string;

	loading = false;
	data;
	significance;
	sigFourTotal;

	alleleVisible = false;

	constructor(
		private api: ApiService,
		private sanitizer: DomSanitizer,
	) {}

	ngOnInit() {
		const gene = this.gene();
  if (gene) {
			if (gene.hgncId) {
				this.urlSearchTerm = gene.hgncId + '%5BHGNC+identifier+for+human+gene%5D';
			} else {
				this.urlSearchTerm = gene.symbol + '%5Bgene%5D';
			}
		}

		this.loading = true;
		this.api
			.getClinVarByEntrezId(gene.entrezId)
			.pipe(take(1))
			.subscribe((res) => {
				this.significance = {
					pathogenic: 0,
					'likely pathogenic': 0,
					'likely benign': 0,
					benign: 0,
				};
				for (const item of res) {
					item.location = '';
					if (item.chr) {
						item.location = `Chr${item.chr}:`;
					}
					if (item.start) {
						item.location = item.location + `${item.start}`;
					}
					if (item.stop && item.start !== item.stop) {
						item.location = item.location + `-${item.stop}`;
					}
					item.significanceText = item.significance.description;
					item.reviewStatus = item.significance.reviewStatus;

					item.significanceText.split(/[\/,]/).forEach((S) => {
						S = S.toLowerCase().trim();
						if (!(S in this.significance)) {
							this.significance[S] = 0;
						}
						this.significance[S] += 1;
					});
				}
				this.sigFourTotal =
					this.significance['pathogenic'] +
					this.significance['likely pathogenic'] +
					this.significance['likely benign'] +
					this.significance['benign'];
				this.data = res;
				this.loading = false;
			});
	}

	getWidthPercStyle(num: number, total: number) {
		return this.sanitizer.bypassSecurityTrustStyle(`width: ${((num / total) * 100).toFixed(3)}%`);
	}
}
