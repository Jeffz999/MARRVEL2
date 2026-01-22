import { Component, SimpleChanges, OnInit, input, inject } from '@angular/core';
import { MatSlideToggleChange, MatSlideToggle } from '@angular/material/slide-toggle';
import { take } from 'rxjs/operators';

import { ApiService } from '../../../../services/api.service';

import { HumanGene } from '../../../../interfaces/gene';
import { Variant } from '../../../../interfaces/variant';
import { Geno2MPResult } from '../../../../interfaces/data';

import { Animations } from './../../../../animations';
import { FUNCANNO_TO_CAT_NUM, CAT_NUM_TO_CAT_NAME } from './categories';
import { HPO_BROAD_TO_CAT } from '../../../../category';
import { NgIf, NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatTooltip } from '@angular/material/tooltip';
import { Geno2mpGeneTableComponent } from './geno2mp-gene-table/geno2mp-gene-table.component';
import { Geno2mpVariantTableComponent } from './geno2mp-variant-table/geno2mp-variant-table.component';

@Component({
    selector: 'app-geno2mp',
    templateUrl: './geno2mp.component.html',
    styleUrls: ['./geno2mp.component.scss'],
    animations: [Animations.toggleInOut],
    imports: [
        NgIf,
        MatButton,
        MatIcon,
        MatFormField,
        MatLabel,
        MatSelect,
        MatOption,
        NgFor,
        MatSlideToggle,
        MatTooltip,
        Geno2mpGeneTableComponent,
        Geno2mpVariantTableComponent,
    ],
})
export class Geno2mpComponent implements OnInit {
	private api = inject(ApiService);

	readonly variant = input<Variant | null>(undefined);
	readonly gene = input<HumanGene | null>(undefined);

	searchBy = 'gene';

	loading = false;
	variantData: Geno2MPResult;
	geneData: Geno2MPResult[];

	phenotypes: object;
	phenotypeString: string;

	// For variant data
	includeRelated = false;
	affectedCount = 0;

	// For gene data
	geneSummary = { 0: 0, 1: 0, 2: 0, 3: 0 };
	varCategoryNames = [
		'Non-Coding',
		'Synonymous/Unknown',
		'Missense/Other Indel',
		'Splice/Frameshift/Nonsense/Stop Loss',
	];
	varCategoriesVisible = {
		'Non-Coding': false,
		'Synonymous/Unknown': false,
		'Missense/Other Indel': true,
		'Splice/Frameshift/Nonsense/Stop Loss': true,
	};

	ngOnInit() {
		const variant = this.variant();
  this.searchBy = variant && variant.chr ? 'variant' : 'gene';

		const gene = this.gene();
  if (gene) {
			this.loading = true;
			this.api
				.getGeno2MPByGeneEntrezId(gene.entrezId)
				.pipe(take(1))
				.subscribe((res: Geno2MPResult[]) => {
					res = res || [];
					this.geneSummary = { 0: 0, 1: 0, 2: 0, 3: 0 };
					for (let i = 0; i < res.length; ++i) {
						const catNum = FUNCANNO_TO_CAT_NUM[res[i].funcAnno];
						res[i]['categoryNum'] = catNum;
						res[i]['category'] = CAT_NUM_TO_CAT_NAME[catNum];
						res[i]['nHpoProfiles'] = res[i].hpoProfiles.length;

						this.geneSummary[catNum] += res[i].hpoProfiles.length;
					}
					this.geneData = res;
					this.loading = false;
				});
		}

		const variantValue = this.variant();
  if (variantValue && variantValue.chr) {
			this.loading = true;
			this.api
				.getGeno2MPByVariant(variantValue)
				.pipe(take(1))
				.subscribe((res: Geno2MPResult) => {
					if (res && res.hpoProfiles) {
						for (let i = 0; i < res.hpoProfiles.length; ++i) {
							res.hpoProfiles[i]['broadTerm'] = res.hpoProfiles[i].broad.hpoTerm || '';
							res.hpoProfiles[i]['mediumTerm'] = res.hpoProfiles[i].medium.hpoTerm || '';
							res.hpoProfiles[i]['narrowTerm'] = res.hpoProfiles[i].narrow.hpoTerm || '';
						}
					}
					this.variantData = res;
					this.loading = false;
					this.countPhenotypes([this.variantData]);
				});
		}
	}

	countPhenotypes(variants: Geno2MPResult[]) {
		this.affectedCount = 0;
		const phenotypes = {};
		if (variants && variants.length) {
			for (const variant of variants) {
				if (variant && variant.hpoProfiles) {
					for (const hpoProfile of variant.hpoProfiles) {
						if (hpoProfile.affectedStatus === 'affected') {
							++this.affectedCount;
							for (const hpoId of hpoProfile.broad.hpoIds) {
								const catName = HPO_BROAD_TO_CAT[hpoId];
								phenotypes[catName] = (phenotypes[catName] || 0) + 1;
							}
						}
					}
				}
			}
		}
		this.phenotypes = phenotypes;
		this.phenotypeString = Object.keys(this.phenotypes).join(', ');
	}

	onCategoryChange(catName, e: MatSlideToggleChange) {
		this.varCategoriesVisible[catName] = e.checked;
	}
}
